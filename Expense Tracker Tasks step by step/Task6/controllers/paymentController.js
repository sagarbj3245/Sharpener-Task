const { Cashfree } = require("cashfree-pg");
const db = require("../db/db");
const path = require("path");

const cashfree = new Cashfree(
  Cashfree.SANDBOX,
  process.env.CASHFREE_CLIENT_ID,
  process.env.CASHFREE_CLIENT_SECRET
);

// ✅ CREATE ORDER
exports.createOrder = async (req, res) => {
  const userId = req.user.userId;
  const orderId = `ORD_${Date.now()}`;
  const orderAmount = 199;
  const orderCurrency = "INR";

  try {
    const expiry = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

    const request = {
      order_id: orderId,
      order_amount: orderAmount,
      order_currency: orderCurrency,
      customer_details: {
        customer_id: `user_${userId}`,
        customer_phone: "9876543210",
        customer_email: "test@example.com"
      },
      order_meta: {
        return_url: `http://localhost:3000/api/payment-status/${orderId}`
      },
      order_expiry_time: expiry,
    };

    const response = await cashfree.PGCreateOrder(request);

    db.query(
      "INSERT INTO orders (orderId, userId, amount, status) VALUES (?, ?, ?, ?)",
      [orderId, userId, orderAmount, "PENDING"],
      (err) => {
        if (err) console.error("❌ Insert failed:", err);
        else console.log(`✅ Order saved: ${orderId}`);
      }
    );

    res.json({ paymentSessionId: response.data.payment_session_id });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Could not create order" });
  }
};

// ✅ RETURN URL
exports.paymentStatus = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const response = await cashfree.PGFetchOrder(orderId);
    const status = response.data.order_status;

    console.log(`👉 Return URL | order_status: ${status}`);

    db.query(
      "SELECT userId FROM orders WHERE orderId = ?",
      [orderId],
      (err, results) => {
        if (err || results.length === 0) {
          console.error("❌ Return URL: Order lookup failed");
          return res.status(404).send("Order not found");
        }

        const userId = results[0].userId;

        db.query(
          "UPDATE orders SET status = ? WHERE orderId = ?",
          [status, orderId],
          (err) => {
            if (err) {
              console.error("❌ Return URL: Order update failed:", err);
              return res.status(500).send("Failed");
            }

            console.log(`✅ Return URL: Order updated: ${orderId} => ${status}`);

            if (status === "PAID") {
              db.query(
                "UPDATE users SET isPremium = 1 WHERE id = ?",
                [userId],
                (err) => {
                  if (err) console.error("❌ Return URL: User premium update failed:", err);
                }
              );
              return res.sendFile(path.join(__dirname, "../views/paymentSuccess.html"));
            }
          }
        );
      }
    );

  } catch (err) {
    console.error("❌ Return URL: Cashfree fetch failed:", err);
    res.status(500).send("Payment check failed");
  }
};

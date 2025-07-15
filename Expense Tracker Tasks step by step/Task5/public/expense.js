document.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  if (!token) return window.location.href = '/login';

  const form = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const submitBtn = document.getElementById('submitBtn');
  const buyPremiumBtn = document.getElementById('buyPremium');

  let editingId = null;

  fetchExpenses();

  form.addEventListener('submit', e => {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    const expenseData = { amount, description, category, date, time };

    if (editingId) {
      fetch(`/api/expenses/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
      }).then(() => {
        editingId = null;
        submitBtn.textContent = 'Add Expense';
        form.reset();
        fetchExpenses();
      });
    } else {
      fetch('/api/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(expenseData)
      }).then(() => {
        form.reset();
        fetchExpenses();
      });
    }
  });

  function fetchExpenses() {
    fetch('/api/expenses', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(expenses => {
        expenseList.innerHTML = '';
        expenses.forEach(exp => {
          const li = document.createElement('li');
          li.className = 'list-group-item mb-3';

          const formattedDate = exp.date ? new Date(exp.date).toLocaleDateString() : '';
          const formattedTime = exp.time || '';

          li.innerHTML = `
            <div class="p-3 border rounded shadow-sm">
              <h5 class="mb-1">₹${exp.amount}</h5>
              <p class="mb-1">${exp.description}</p>
              <p class="mb-1"><strong>Category:</strong> ${exp.category}</p>
              <p class="mb-1"><strong>Date:</strong> ${formattedDate} &nbsp; <strong>Time:</strong> ${formattedTime}</p>
              <div class="d-flex justify-content-end">
                <button data-id="${exp.id}" class="btn btn-sm btn-primary me-2 edit-btn">Edit</button>
                <button data-id="${exp.id}" class="btn btn-sm btn-danger delete-btn">Delete</button>
              </div>
            </div>
          `;
          expenseList.appendChild(li);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            fetch(`/api/expenses/${btn.dataset.id}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${token}` }
            }).then(() => fetchExpenses());
          });
        });

        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const exp = expenses.find(e => e.id == btn.dataset.id);
            document.getElementById('amount').value = exp.amount;
            document.getElementById('description').value = exp.description;
            document.getElementById('category').value = exp.category;
            document.getElementById('date').value = exp.date ? exp.date.split('T')[0] : '';
            document.getElementById('time').value = exp.time || '';

            editingId = exp.id;
            submitBtn.textContent = 'Update Expense';
          });
        });
      });
  }

  // ✅ Cashfree Payment Logic
  // ✅ Correct Buy Premium button click
buyPremiumBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('/api/pay', { // ✅ correct path
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (res.ok && data.paymentSessionId) {
      const cashfree = Cashfree({ mode: "sandbox" });
      await cashfree.checkout({
        paymentSessionId: data.paymentSessionId,
        redirectTarget: "_self",
      });
    } else {
      alert(data.message || "Could not initiate payment.");
    }
  } catch (err) {
    console.error("❌ Error:", err);
    alert("Something went wrong");
  }
});


});

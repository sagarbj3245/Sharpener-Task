const db = require('../db/db');

exports.showLeaderboard = (req, res) => {
  const query = `
    SELECT users.name, SUM(expenses.amount) AS totalExpense
    FROM expenses
    JOIN users ON expenses.userId = users.id
    GROUP BY users.id
    ORDER BY totalExpense DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.json(results);
  });
};

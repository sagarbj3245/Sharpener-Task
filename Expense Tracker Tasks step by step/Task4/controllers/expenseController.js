const db = require('../db/db');

exports.addExpense = (req, res) => {
  const { amount, description, category, date, time } = req.body;
  const userId = req.user.userId;

  db.query(
    'INSERT INTO expenses (amount, description, category, date, time, userId) VALUES (?, ?, ?, ?, ?, ?)',
    [amount, description, category, date, time, userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.getExpenses = (req, res) => {
  const userId = req.user.userId;
  db.query('SELECT * FROM expenses WHERE userId = ? ORDER BY createdAt DESC',
    [userId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
};

exports.deleteExpense = (req, res) => {
  const userId = req.user.userId;
  const expenseId = req.params.id;

  db.query('DELETE FROM expenses WHERE id = ? AND userId = ?',
    [expenseId, userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(403).send('Not allowed');
      res.sendStatus(204);
    });
};

exports.editExpense = (req, res) => {
  const { amount, description, category, date, time } = req.body;
  const userId = req.user.userId;
  const expenseId = req.params.id;

  db.query(
    'UPDATE expenses SET amount=?, description=?, category=?, date=?, time=? WHERE id=? AND userId=?',
    [amount, description, category, date, time, expenseId, userId],
    (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.affectedRows === 0) return res.status(403).send('Not allowed');
      res.sendStatus(200);
    }
  );
};

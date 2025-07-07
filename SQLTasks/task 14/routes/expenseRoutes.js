const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Route to create a new expense
router.post('/expense', expenseController.createExpense);

// Route to get all expenses
router.get('/expenses', expenseController.getExpenses);

// Route to delete an expense by ID
router.delete('/expense/:id', expenseController.deleteExpense);

// Route to edit an expense by ID (Bonus Task)
router.put('/expense/:id', expenseController.editExpense);

module.exports = router;

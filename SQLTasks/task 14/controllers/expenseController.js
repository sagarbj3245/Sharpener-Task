const Expense = require('../models/Expense');

// Create an expense
exports.createExpense = async (req, res) => {
  try {
    const { title, amount, date, category } = req.body;
    
    if (!title || !amount || !category) {
      return res.status(400).json({ error: 'Title, amount, and category are required fields' });
    }
    
    const newExpense = await Expense.create({ 
      amount: parseFloat(amount), 
      category, 
      description: title, // Using title as description
      date: date || new Date() 
    });
    
    // Transform to match frontend expectations
    const createdExpense = {
      id: newExpense.id,
      title: newExpense.description,
      amount: newExpense.amount,
      date: newExpense.date,
      category: newExpense.category
    };
    
    res.status(201).json(createdExpense);
  } catch (err) {
    console.error('Create expense error:', err);
    res.status(500).json({ error: 'Failed to create expense' });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    // Transform data to match frontend expectations
    const transformedExpenses = expenses.map(exp => ({
      id: exp.id,
      title: exp.description,
      amount: exp.amount,
      date: exp.date,
      category: exp.category
    }));
    res.status(200).json(transformedExpenses);
  } catch (err) {
    console.error('Get expenses error:', err);
    res.status(500).json({ error: 'Failed to fetch expenses' });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Delete expense error:', err);
    res.status(500).json({ error: 'Failed to delete expense' });
  }
};

// Edit an expense (Bonus Task)
exports.editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, amount, date, category } = req.body;
    const expense = await Expense.findByPk(id);
    if (!expense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.description = title || expense.description;
    expense.date = date || expense.date;
    
    await expense.save();
    
    // Transform to match frontend expectations
    const updatedExpense = {
      id: expense.id,
      title: expense.description,
      amount: expense.amount,
      date: expense.date,
      category: expense.category
    };
    
    res.status(200).json(updatedExpense);
  } catch (err) {
    console.error('Edit expense error:', err);
    res.status(500).json({ error: 'Failed to edit expense' });
  }
};

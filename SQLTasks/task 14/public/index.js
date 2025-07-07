// Fetch all expenses when the page loads
window.onload = fetchExpenses;

// Function to fetch all expenses
async function fetchExpenses() {
  try {
    const response = await fetch('/api/expenses');
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    const expenses = await response.json();
    if (Array.isArray(expenses)) {
      displayExpenses(expenses);
    } else {
      console.error('Expected an array of expenses but got:', expenses);
      displayExpenses([]);
    }
  } catch (error) {
    console.error('Error fetching expenses:', error);
    displayExpenses([]);
  }
}

// Function to display expenses
function displayExpenses(expenses) {
  const expensesList = document.getElementById('expenses');
  expensesList.innerHTML = '';
  
  if (expenses.length === 0) {
    const noExpensesItem = document.createElement('li');
    noExpensesItem.textContent = 'No expenses found. Add your first expense!';
    noExpensesItem.className = 'no-expenses';
    expensesList.appendChild(noExpensesItem);
    return;
  }
  
  expenses.forEach(expense => {
    try {
      const formattedDate = new Date(expense.date).toISOString().split('T')[0];
      const expenseItem = document.createElement('li');
      expenseItem.innerHTML = `
        <span>${expense.title} - ₹${parseFloat(expense.amount).toFixed(2)} (${formattedDate})</span>
        <div class="expense-actions">
          <button onclick="deleteExpense(${expense.id})">Delete</button>
          <button onclick="prepareEditExpense(${expense.id}, '${expense.title.replace(/'/g, "\\'")}', ${expense.amount}, '${formattedDate}', '${expense.category.replace(/'/g, "\\'")}')">Edit</button>
        </div>
      `;
      expensesList.appendChild(expenseItem);
    } catch (err) {
      console.error('Error displaying expense:', err, expense);
    }
  });
}

// Global variable to track if we're editing an expense
let isEditing = false;
let currentEditId = null;

// Function to prepare the form for editing an expense
function prepareEditExpense(id, title, amount, date, category) {
  document.getElementById('title').value = title;
  document.getElementById('amount').value = amount;
  document.getElementById('date').value = date;
  document.getElementById('category').value = category;
  
  // Change button text to indicate editing mode
  document.querySelector('#expense-form button[type="submit"]').textContent = 'Update Expense';
  
  // Set editing mode
  isEditing = true;
  currentEditId = id;
}

// Handle the form submission for adding or editing an expense
const expenseForm = document.getElementById('expense-form');
expenseForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const amount = parseFloat(document.getElementById('amount').value);
  const date = document.getElementById('date').value;
  const category = document.getElementById('category').value;

  const expenseData = { title, amount, date, category };

  try {
    let response;
    
    if (isEditing) {
      // Update existing expense
      response = await fetch(`/api/expense/${currentEditId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });
      
      // Reset editing mode
      isEditing = false;
      currentEditId = null;
      document.querySelector('#expense-form button[type="submit"]').textContent = 'Add Expense';
    } else {
      // Add new expense
      response = await fetch('/api/expense', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });
    }

    const result = await response.json();
    fetchExpenses(); // Refresh the expenses list
    expenseForm.reset(); // Clear the form
  } catch (error) {
    console.error('Error with expense operation:', error);
  }
});

// Function to delete an expense by ID
async function deleteExpense(id) {
  try {
    const response = await fetch(`/api/expense/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    alert(result.message);
    fetchExpenses(); // Refresh the expenses list
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
}

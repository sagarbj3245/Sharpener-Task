let savedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(savedExpenses));
}

function createExpenseListItem(expense, index) {
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between align-items-center";
  listItem.innerHTML = `
    <div>
      <strong>₹${expense.amount}</strong> - ${expense.category.toUpperCase()} - ${expense.description}
    </div>
  `;

  const buttonGroup = document.createElement("div");

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn btn-danger btn-sm me-2";
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", function () {
    savedExpenses.splice(index, 1);
    updateLocalStorage();
    renderExpenses();
  });

  const editButton = document.createElement("button");
  editButton.className = "btn btn-warning btn-sm";
  editButton.textContent = "Edit";
  editButton.addEventListener("click", function () {
    const newAmount = prompt("Enter new expenditure amount:", expense.amount);
    const newDescription = prompt("Enter new description:", expense.description);
    const newCategory = prompt("Enter new category (food, movie, fuel, electricity):", expense.category);

    if (newAmount && newDescription && newCategory) {
      expense.amount = newAmount;
      expense.description = newDescription;
      expense.category = newCategory.toLowerCase();
      updateLocalStorage();
      renderExpenses();
    }
  });

  buttonGroup.appendChild(deleteButton);
  buttonGroup.appendChild(editButton);
  listItem.appendChild(buttonGroup);

  return listItem;
}

function renderExpenses() {
  const expenseList = document.getElementById("expenseList");
  expenseList.innerHTML = "";
  savedExpenses.forEach((expense, index) => {
    const listItem = createExpenseListItem(expense, index);
    expenseList.appendChild(listItem);
  });
}

document.getElementById("addExpenseButton").addEventListener("click", function () {
  const expenseAmountInput = document.getElementById("expenseAmount");
  const expenseDescriptionInput = document.getElementById("expenseDescription");
  const expenseCategoryInput = document.getElementById("expenseCategory");

  const expenseAmount = expenseAmountInput.value;
  const expenseDescription = expenseDescriptionInput.value;
  const expenseCategory = expenseCategoryInput.value;

  if (expenseAmount === "" || expenseDescription === "") {
    alert("Please fill out all fields.");
    return;
  }

  const newExpense = {
    amount: expenseAmount,
    description: expenseDescription,
    category: expenseCategory
  };

  savedExpenses.push(newExpense);
  updateLocalStorage();
  renderExpenses();

  expenseAmountInput.value = "";
  expenseDescriptionInput.value = "";
});

renderExpenses();

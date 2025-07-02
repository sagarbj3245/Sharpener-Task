// Get the ul element
const fruitList = document.querySelector('.fruits');

// Get the form
const form = document.querySelector('form');

// Get the fruit name input field
const fruitInput = document.getElementById('fruit-to-add');

// Get the filter input field
const filterInput = document.getElementById('filter');

// Add the description input field
const descriptionInput = document.createElement('input');
descriptionInput.type = 'text';
descriptionInput.name = 'description';
descriptionInput.id = 'description';
descriptionInput.placeholder = 'Add description...';
const addButton = form.querySelector('button[type="submit"]');
form.insertBefore(descriptionInput, addButton);

// Add Edit buttons to the initial list items and format existing ones
const listItems = fruitList.querySelectorAll('li');
listItems.forEach(item => {
    const deleteButton = item.querySelector('.delete-btn');
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    item.insertBefore(editButton, deleteButton.nextSibling);

    const fruitName = item.firstChild.textContent;
    item.innerHTML = '';
    const nameSpan = document.createElement('span');
    nameSpan.textContent = fruitName;
    const descriptionPara = document.createElement('p');
    descriptionPara.style.fontStyle = 'italic';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'x';
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';

    item.appendChild(nameSpan);
    item.appendChild(descriptionPara);
    item.appendChild(deleteBtn);
    item.appendChild(editBtn);
});

// Function to add a new fruit item
function addFruitItem(fruitName, fruitDescription) {
    const newListItem = document.createElement('li');
    newListItem.className = 'fruit';

    const nameSpan = document.createElement('span');
    nameSpan.textContent = fruitName;

    const descriptionPara = document.createElement('p');
    descriptionPara.style.fontStyle = 'italic';
    descriptionPara.textContent = fruitDescription;

    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'x';

    // Create edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';

    newListItem.appendChild(nameSpan);
    newListItem.appendChild(descriptionPara);
    newListItem.appendChild(deleteButton);
    newListItem.appendChild(editButton);
    fruitList.appendChild(newListItem);
}

// Add event listener for form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const newFruit = fruitInput.value.trim();
    const newDescription = descriptionInput.value.trim();
    if (newFruit !== '') {
        addFruitItem(newFruit, newDescription);
        fruitInput.value = '';
        descriptionInput.value = '';
    }
});

// Add event listener for delete button clicks (using event delegation)
fruitList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const listItemToRemove = e.target.parentElement;
        fruitList.removeChild(listItemToRemove);
    }
});

// Add event listener for filter input
filterInput.addEventListener('keyup', function () {
    const filterText = filterInput.value.toLowerCase();
    const fruits = fruitList.querySelectorAll('li');

    fruits.forEach(fruit => {
        const nameSpan = fruit.querySelector('span');
        const descriptionPara = fruit.querySelector('p');
        const fruitName = nameSpan ? nameSpan.textContent.toLowerCase() : '';
        const fruitDescription = descriptionPara ? descriptionPara.textContent.toLowerCase() : '';

        const nameMatch = fruitName.includes(filterText);
        const descriptionMatch = fruitDescription.includes(filterText);

        if (nameMatch || descriptionMatch) {
            fruit.style.display = '';
        } else {
            fruit.style.display = 'none';
        }
    });
});

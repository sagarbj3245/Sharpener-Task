const fruitList = document.querySelector('.fruits');
const form = document.querySelector('form');
const fruitInput = document.getElementById('fruit-to-add');
const listItems = fruitList.querySelectorAll('li');

listItems.forEach(item => {
    const deleteButton = item.querySelector('.delete-btn');
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    item.insertBefore(editButton, deleteButton.nextSibling);
});

function addFruitItem(fruitName) {
    const newListItem = document.createElement('li');
    newListItem.className = 'fruit';
    newListItem.textContent = fruitName;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'x';

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';

    newListItem.appendChild(deleteButton);
    newListItem.appendChild(editButton);
    fruitList.appendChild(newListItem);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const newFruit = fruitInput.value.trim();
    if (newFruit !== '') {
        addFruitItem(newFruit);
        fruitInput.value = '';
    }
});

fruitList.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const listItemToRemove = e.target.parentElement;
        fruitList.removeChild(listItemToRemove);
    }
});

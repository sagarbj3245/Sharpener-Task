document.addEventListener("DOMContentLoaded", initialize);


// Don't remove anything just complete the functions


// When the page get load display all users
function initialize() {
    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    for (let i = 0; i < usersList.length; i++) {
        display(usersList[i]);
    }
}


// add new users in usersList array
function handleFormSubmit(event) {
    event.preventDefault();

    const username = event.target.username.value;
    const email = event.target.email.value;

    const phone = event.target.phone.value;

    const userDetails = {
        username: username,
        email: email,
        phone: phone,
    };

    const usersList = JSON.parse(localStorage.getItem("usersList")) || [];

    userDetails.id = Date.now();

    usersList.push(userDetails);

    localStorage.setItem("usersList", JSON.stringify(usersList));

    display(userDetails); // Display the newly added user
}


// use this function to display user on screen
function display(data) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");
    li.textContent = `${data.username} - ${data.email} - ${data.phone}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteData(data.id, li));

    li.appendChild(deleteButton);
    ul.appendChild(li);
}


// use this function to delete the user details from local store and DOM (screen)
function deleteData(id, li) {
    let usersList = JSON.parse(localStorage.getItem("usersList")) || [];
    const updatedUsersList = [];

    for (let i = 0; i < usersList.length; i++) {
        if (usersList[i].id !== id) {
            updatedUsersList.push(usersList[i]);
        }
    }

    localStorage.setItem("usersList", JSON.stringify(updatedUsersList));
    li.remove();
}




module.exports = handleFormSubmit

function handleFormSubmit(event) {
  event.preventDefault();
  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };
  axios
    .post(
      "https://crudcrud.com/api/5519d12fca344fd6b10665aea264519d/appointmentData",
      userDetails
    )
    .then((response) => displayUserOnScreen(response.data))
    .catch((error) => console.log(error));

  // Clearing the input fields
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.appendChild(
    document.createTextNode(
      `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`
    )
  );

  const deleteBtn = document.createElement("button");
  deleteBtn.appendChild(document.createTextNode("Delete"));
  userItem.appendChild(deleteBtn);

  const editBtn = document.createElement("button");
  editBtn.appendChild(document.createTextNode("Edit"));
  userItem.appendChild(editBtn);

  const userList = document.querySelector("ul");
  userList.appendChild(userItem);

deleteBtn.addEventListener("click", function (event) {
  userList.removeChild(event.target.parentElement);
  axios
    .delete(`https://crudcrud.com/api/5519d12fca344fd6b10665aea264519d/appointmentData/${userDetails._id}`)
    .then(() => console.log("Deleted from backend"))
    .catch((err) => console.error("Delete failed", err));
});

editBtn.addEventListener("click", function (event) {
  userList.removeChild(event.target.parentElement);
  document.getElementById("username").value = userDetails.username;
  document.getElementById("email").value = userDetails.email;
  document.getElementById("phone").value = userDetails.phone;

  axios
    .delete(`https://crudcrud.com/api/5519d12fca344fd6b10665aea264519d/appointmentData/${userDetails._id}`)
    .then(() => console.log("Old entry removed for editing"))
    .catch((err) => console.error("Edit-delete failed", err));
});


// Do not touch code below
module.exports = handleFormSubmit;

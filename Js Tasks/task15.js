// Write your code below:
document.addEventListener("DOMContentLoaded", function () {
  axios
    .get("https://crudcrud.com/api/49234dd733214f988ea003296c3b4cb8/appointmentData")
    .then((response) => {
      response.data.forEach((user) => {
        displayUserOnScreen(user);
      });
    })
    .catch((error) => console.error("GET Error:", error));
});

function handleFormSubmit(event) {
  event.preventDefault();

  const userDetails = {
    username: event.target.username.value,
    email: event.target.email.value,
    phone: event.target.phone.value,
  };

  axios
    .post("https://crudcrud.com/api/49234dd733214f988ea003296c3b4cb8/appointmentData", userDetails)
    .then((response) => {
      displayUserOnScreen(response.data);
    })
    .catch((error) => console.error("POST Error:", error));

  event.target.reset();
}

function displayUserOnScreen(userDetails) {
  const userItem = document.createElement("li");
  userItem.textContent = `${userDetails.username} - ${userDetails.email} - ${userDetails.phone}`;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    axios
      .delete(`https://crudcrud.com/api/49234dd733214f988ea003296c3b4cb8/appointmentData/${userDetails._id}`)
      .then(() => {
        userItem.remove();
      })
      .catch((err) => console.error("DELETE Error:", err));
  });

  userItem.appendChild(deleteBtn);
  document.querySelector("ul").appendChild(userItem);
}


// Do not touch the code below
module.exports = handleFormSubmit;

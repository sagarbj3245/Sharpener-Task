const API_BASE = "https://crudcrud.com/api/f96fbdcf870f4b68afbfdc6255e0d27d/passwords";

const passwordList = document.getElementById("password-list");
const totalEl = document.getElementById("total");

let total = 0;

window.onload = function() {
  fetch(API_BASE)
    .then(res => res.json())
    .then(data => {
      passwordList.innerHTML = "";
      total = 0;
      data.forEach(showPassword);
      total = data.length;
      updateTotal();
    })
    .catch(err => console.error(err));
};

function addPassword() {
  const title = document.getElementById("title").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!title || !password) {
    alert("Both fields are required!");
    return;
  }

  const newPwd = { title, password };

  fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newPwd)
  })
    .then(res => res.json())
    .then(data => {
      showPassword(data);
      total++;
      updateTotal();
    })
    .catch(err => console.error(err));

  document.getElementById("title").value = "";
  document.getElementById("password").value = "";
}

function showPassword(pwd) {
  const li = document.createElement("li");
  li.className = "list-group-item";
  li.setAttribute("data-id", pwd._id);

  const span = document.createElement("span");
  span.textContent = `${pwd.title} - ${pwd.password}`;
  li.appendChild(span);

  const editBtn = document.createElement("button");
  editBtn.className = "btn btn-warning btn-sm";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => editPassword(pwd, li);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn btn-danger btn-sm ms-2"; // Bootstrap spacing
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deletePassword(pwd._id, li);

  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  passwordList.appendChild(li);
}

function deletePassword(id, li) {
  fetch(`${API_BASE}/${id}`, {
    method: "DELETE"
  })
    .then(() => {
      li.remove();
      total--;
      updateTotal();
    })
    .catch(err => console.error(err));
}

function editPassword(pwd, li) {
  document.getElementById("title").value = pwd.title;
  document.getElementById("password").value = pwd.password;

  deletePassword(pwd._id, li);
}

function filterPasswords() {
  const term = document.getElementById("search").value.toLowerCase();
  const items = document.querySelectorAll("#password-list li");

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? "" : "none";
  });
}

function updateTotal() {
  totalEl.textContent = total;
}

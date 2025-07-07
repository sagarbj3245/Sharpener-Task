async function handleFormSubmit(event) {
    event.preventDefault();

    const username = event.target.elements.username.value;
    const email = event.target.elements.email.value;
    const phone = event.target.elements.phone.value;

    const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, phone }),
    });

    const data = await res.json();
    console.log("User added:", data);
    event.target.reset();
    loadUsers();
}

async function loadUsers() {
    const res = await fetch('/api/users');
    const users = await res.json();

    const userList = document.getElementById('userList');
    if (userList) userList.remove();

    const list = document.createElement('ul');
    list.id = 'userList';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `${user.username} - ${user.email} - ${user.phone}`;
        const btn = document.createElement('button');
        btn.textContent = "Delete";
        btn.onclick = () => deleteUser(user.id);
        li.appendChild(btn);
        list.appendChild(li);
    });
    document.body.appendChild(list);
}

async function deleteUser(id) {
    await fetch(`/api/users/${id}`, { method: 'DELETE' });
    loadUsers();
}

window.onload = loadUsers;

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    localStorage.setItem('token', data.token);
    window.location.href = '/expenses';
  })
  .catch(err => alert(err));
});

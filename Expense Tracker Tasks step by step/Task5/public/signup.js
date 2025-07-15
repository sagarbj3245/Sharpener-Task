document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  }).then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      window.location.href = '/expenses';
    })
    .catch(err => alert(err));
});

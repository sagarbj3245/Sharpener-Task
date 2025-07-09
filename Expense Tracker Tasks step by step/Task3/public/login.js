document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  console.log('Sending login:', { email, password });

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.text();
    })
    .then(data => {
      alert(data);
      // ✅ Redirect to dashboard or homepage if needed
    })
    .catch(err => {
      console.error('Login error:', err);
      alert(err.message || 'Login failed');
    });
});

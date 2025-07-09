document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  console.log('Sending signup:', { name, email, password });

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, password })
  })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.text();
    })
    .then(data => {
      alert(data);
      window.location.href = '/login'; // ✅ redirect after signup
    })
    .catch(err => {
      console.error('Signup error:', err);
      alert(err.message || 'Something went wrong!');
    });
});

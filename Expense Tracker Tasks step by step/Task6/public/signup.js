// signup.js

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  const res = await fetch('/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });

  if (res.ok) {
    alert('Signup successful! Please login.');
    window.location.href = '/login'; // ✅ Go to login page now!
  } else {
    const data = await res.json();
    alert(data.message || 'Signup failed.');
  }
});

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
   sessionStorage.setItem('token', data.token);
sessionStorage.setItem('isPremium', data.isPremium);


    if (data.isPremium) {
      window.location.href = '/premium'; // ✅ Your premium dashboard page
    } else {
      window.location.href = '/expenses'; // ✅ Normal dashboard
    }
  })
  .catch(err => alert(err));
});

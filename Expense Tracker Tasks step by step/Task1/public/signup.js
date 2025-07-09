document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Password:', password);

  alert('Signup data collected! Check console.');
});

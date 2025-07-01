const http = require('http');

const server = http.createServer((req, res) => {
  let responseMessage = '';

  if (req.url === '/') {
    responseMessage = 'Hello World';
  } else if (req.url === '/pizza') {
    responseMessage = 'This is your pizza';
  } else if (req.url === '/home') {
    responseMessage = 'Welcome home';
  } else if (req.url === '/about') {
    responseMessage = 'Welcome to About Us';
  } else if (req.url === '/node') {
    responseMessage = 'Welcome to my Node Js project';
  } else {
    responseMessage = 'Page Not Found';
  }

  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(`<h1>${responseMessage}</h1>`);
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

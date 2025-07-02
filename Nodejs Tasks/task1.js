const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  
  res.setHeader('Content-Type', 'text/html');
  
  let responseContent = '';
  
  if (url === '/') {
    responseContent = 'Hello World';
  } else if (url === '/pizza') {
    responseContent = 'This is your pizza';
  } else if (url === '/home') {
    responseContent = 'Welcome home';
  } else if (url === '/about') {
    responseContent = 'Welcome to About Us';
  } else if (url === '/node') {
    responseContent = 'Welcome to my Node Js project';
  } else {
    responseContent = 'Page Not Found';
  }
  
  const htmlResponse = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Node.js Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
          .message {
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="message">${responseContent}</div>
      </body>
    </html>
  `;
  
  res.write(htmlResponse);
  return res.end();
});

server.listen(3000, () => {
  console.log('Server is running in http://localhost:3000');
});

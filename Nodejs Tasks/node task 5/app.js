const http = require('http');
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(
        `
            <h1>Hello World</h1>
            <h2>Welcome to my server</h2>
            <h2>Welcome to my server again</h2>
        `
    );
  }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
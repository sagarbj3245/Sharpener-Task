const http = require('http');
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if(url === '/') {
    res.setHeader('Content-Type', 'text/html');
    res.end(
        `
          <form action="/messages" method="POST">
            <label>Name:</label>
            <input type="text" name="username">
            <button type="submit">add</button>
          </form>
        `
    );
  }
  
  if(url === '/messages') {
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>Hello from messages</h1>');
  }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

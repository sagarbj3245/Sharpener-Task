const fs = require('fs');

const requestHandler = (req, res)=> {
    const url = req.url;
    const method = req.method;
  
    if(url === '/') {
      res.setHeader('Content-Type', 'text/html');
      res.end(
          `
            <form action="/message" method="POST">
              <label>Name:</label>
              <input type="text" name="username">
              <button type="submit">add</button>
            </form>
          `
      );
    }
    else if(url === '/message' && method === 'POST') {
        let body = [];
        req.on('data', chunk => {
            body.push(chunk);
        });
        req.on('end', () => {
            let buffer = Buffer.concat(body);
            let formData = buffer.toString();

            const formValues = formData.split('=')[1];

            fs.writeFile('formValues.txt', formValues, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    else if(url === '/read') {
        fs.readFile('formValues.txt', 'utf-8', (err, data) => {
            res.setHeader('Content-Type', 'text/html');
            if (err) {
                return res.end('Error reading file');
            }
            console.log(data.toString());
            res.end(`${data.toString()}`);
        });
    }
    else if(url === '/messages') {
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>Hello from messages</h1>');
    }
    else {
      res.setHeader('Content-Type', 'text/html');
      res.statusCode = 404;
      res.end('<h1>Page not found</h1>');
    }
}

function example() {
    console.log('example function called');
}

// module.exports = requestHandler;

module.exports = {
    requestHandler: requestHandler,
    example: example
}

// module.exports.requestHandler = requestHandler;
// module.exports.example = example;
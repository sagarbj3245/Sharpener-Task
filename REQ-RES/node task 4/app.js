const http = require('http');
const routes = require('./routes');

routes.example(); 
const server = http.createServer(routes.requestHandler);

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
const http = require('http');

const hostName = '127.0.0.1';
const port = 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('text/plain as response');
});

server.listen(port, hostName);

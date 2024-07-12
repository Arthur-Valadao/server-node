const http = require('http');
const users = require('./mockup/users');

const server = http.createServer((request, response) => {
  console.log(`Request method: ${request.method} | Endpoint: ${request.url}`, )

  if(request.url === '/users' && request.method === 'GET'){
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(users));
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Can not ${request.method} ${request.url}`);
  }
})

server.listen(3000, ()=> console.log('Server Started http://localhost:3000'));
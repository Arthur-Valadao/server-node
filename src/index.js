const http = require('http');
const routes = require('./routes');
const url = require('url');

const server = http.createServer((request, response) => {
  const parsedUrl = url.parse(request.url);
  console.log(parsedUrl);

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`, )

  const route = routes.find((routeObject)=>(
    routeObject.endpoint === parsedUrl.pathname && routeObject.method === request.method
  ));

  if(route){
    route.handler(request, response);
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Can not ${request.method} ${parsedUrl.pathname}`);
  }

})

server.listen(3000, ()=> console.log('Server Started http://localhost:3000'));
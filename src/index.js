const http = require('http');
const routes = require('./routes');
const { URL } = require('url');

const server = http.createServer((request, response) => {
  const parsedUrl = new URL(`http://localhost:3000${request.url}`)
  
  console.log(Object.fromEntries(parsedUrl.searchParams));

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`, )

  const route = routes.find((routeObject)=>(
    routeObject.endpoint === parsedUrl.pathname && routeObject.method === request.method
  ));

  if(route){
    request.query = Object.fromEntries(parsedUrl.searchParams);

    route.handler(request, response);
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Can not ${request.method} ${parsedUrl.pathname}`);
  }

})

server.listen(3000, ()=> console.log('Server Started http://localhost:3000'));
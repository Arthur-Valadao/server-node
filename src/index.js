const http = require('http');
const routes = require('./routes');
const { URL } = require('url');
const url = require('url');
const bodyParser = require('./helpers/bodyParser');

const server = http.createServer((request, response) => {
  // const parsedUrl = url.parse(request.url, true)
  const parsedUrl =  new URL(`http://localhost:3000${request.url}`)

  let { pathname } = parsedUrl;
  let id = null;

  //split do endpoint e remoção de string vazia
  const splitEndPoint = pathname.split('/').filter(Boolean);

  if (splitEndPoint.length > 1){
    pathname = `/${splitEndPoint[0]}/:id`;
    id = splitEndPoint[1];
  }

  console.log(`Request method: ${request.method} | Endpoint: ${parsedUrl.pathname}`, )

  const route = routes.find((routeObject)=>(
    routeObject.endpoint === parsedUrl.pathname && routeObject.method === request.method
  ));

  if(route){
    request.query = Object.fromEntries(parsedUrl.searchParams);
    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ body }))
    }

    if (['POST', 'PUT', 'PATCH'].includes(request.method)){
      bodyParser(request, () => route.handler(request, response));
    }else{
      route.handler(request, response);
    }
  }
  else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(`Can not ${request.method} ${parsedUrl.pathname}`);
  }

})

server.listen(3000, ()=> console.log('Server Started http://localhost:3000'));
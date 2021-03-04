const http = require('http');
var url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

var pi = Math.PI;

function getArea(radio) {
    const pi = Math.PI;
    return radio * radio * pi;
}

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  let area = getArea(4.0);    
  res.setHeader('Content-Type', 'text/plain');
  res.write(`area calculada = ${area}.`);    
  res.write(`\nConstante = ${pi}\n`);
  var q = url.parse(req.url, true);    
  let array = q.pathname.split('/');
  if(array[1] === 'hello') {
      res.write(JSON.stringify({ 'hello': array[2] }));
  }
  res.end();
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
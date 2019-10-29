const http = require('http');
const debug = require('debug')('node-angular');
const app = require('./app');

 const port = process.env.PORT||3000;

app.set('port',port);
const server = http.createServer(app);

server.listen(port);
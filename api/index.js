const restify = require('restify');
const port = process.env.PORT;
const server = restify.createServer();

server.get('/ports', (req, res, next) => {
  res.send({
    'port': port
  });
  next();
});

server.listen(port);
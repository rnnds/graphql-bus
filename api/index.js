const restify = require('restify');
const port = process.env.PORT || 8099;
const server = restify.createServer();

server.get('/ports', (req, res, next) => {
  res.send({
    'port': port
  });
  next();
});

server.listen(port, function () {
  console.log('%s listening at %s', server.name, server.url);
});
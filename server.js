var http = require('http');
var url = require('url');

exports.start = function (route, handle) {
  var HTTP_PORT=8080;

  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    route(handle, pathname, response);
  }

  http.createServer(onRequest).listen(HTTP_PORT);
  console.log('Listening on port ' + HTTP_PORT);
}
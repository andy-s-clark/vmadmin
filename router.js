exports.route = function (handle, pathname, response) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response)
  } else if (/^\/asset\//.test(pathname)) {
    handle['asset'](response, pathname);
  } else if (/^\/ajax\//.test(pathname)) {
    handle['ajax'](response, pathname);
  } else {
    console.log('No request handler found for ' + pathname);
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write('404 Not found');
    response.end();
  }
}

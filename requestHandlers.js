var exec = require('child_process').exec;
var path = require('path');
var fs   = require('fs');
var mime = require('mime');

// Index Page
exports.index = function (response) {
  outputFile(response, path.resolve(__dirname, 'index.html'));
}

// File proxy for assets
exports.asset = function (response, pathname) {
  // Pathname starts with a "/". Prefix a dot to make it relative to the current directory
  outputFile(response, path.resolve(__dirname, '.'+pathname));
}

// AJAX
exports.ajax = function (response, pathname) {
  // Parse path
  var pathArray=pathname.split('/');
  pathArray.shift(); // Drop "" element
  switch(pathArray[1]) {
    case 'service':
      var service = require ('./service');
      service.service(response, pathArray[2], pathArray[3]);
      break;

    case 'serviceList':
      var service = require ('./service');
      service.serviceList(response);
      break;

    default:
      response.writeHead(501, {"Content-Type": "text/plain"});
      response.write('Not Implemented:'+pathArray[1]);
      response.end();
      break;
  }
}

exports.showDirectory = function (response) {
  exec('ls -lah', function(error, stdout, stderr) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write(stdout);
    response.end();
  });
}

// Helper function to output a file
function outputFile(response, pathname) {
  fs.readFile(pathname, null, function(err, data) {
    if (err) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write('404 Not found');
      response.end();
      return
    }
    response.writeHead(200, {"Content-Type": mime.lookup(pathname)});
    response.write(data);
    response.end();
  });
}
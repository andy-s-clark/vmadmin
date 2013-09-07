var exec = require('child_process').exec;
var path = require('path');
var fs = require('fs');

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
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write(pathname);
  response.end();
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
  fs.readFile(pathname, 'utf8', function(err, data) {
    if (err) {
      console.log(data);
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write('404 Not found');
      response.end();
      return
    }
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(data);
    response.end();
  });
}
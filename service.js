var exec = require('child_process').exec;
var fs   = require('fs');
var path = require('path');

exports.service = function (response, serviceName, serviceRequest) {
  switch(serviceRequest) {
    case 'start':
    case 'stop':
    case 'restart':
    case 'status':
      result = { };
      // Determine if upstart or assume SysV
      if (path.existsSync('/etc/init/'+serviceName+'.conf')) {
        var command = 'initctl '+serviceRequest+' '+serviceName;
      } else {
        var command = 'service '+serviceName+' '+serviceRequest;
      }
      exec(command, function(error, stdout, stderr) {
        result.success = !error;
        if (serviceRequest === 'status') {
          result.success = true; // Status returns FALSE if SysV is not started
          result.running = /(start\/running|is\ running)/.test(stdout);
        }
        result.output = result.success ? stdout : stderr;

        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(result));
        response.end();
      });
      break;
    default:
      response.writeHead(501, {"Content-Type": "text/plain"});
      response.write('Not Implemented: '+serviceRequest);
      response.end();
      break;
  }
}

// Returns a list of possible SysV and upstart services
// For SysV, returns contents of /etc/init.d . TODO Should verify that file is executable.
// For Upstart, returns contents of /etc/init where file name ends in '.conf'
exports.serviceList = function (response) {
  var services = fs.readdirSync('/etc/init.d');
  var upstart = fs.readdirSync('/etc/init');

  for(var i=0; i<upstart.length; i++) {
    var t = /^(.*)\.conf$/.exec(upstart[i]);
    if(t[1]) {
      var duplicate=false;
      for(var j=0; j<services.length; j++) {
        if (services[j] === t[1]) {
          duplicate = true;
        }
      }
      if (!duplicate) {
        services.push(t[1]);
      }
    }
  }

  response.writeHead(200, {"Content-Type": "application/json"});
  response.write(JSON.stringify(services));
  response.end();
}

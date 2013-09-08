var exec = require('child_process').exec;

exports.service = function (response, serviceName, serviceRequest) {
  switch(serviceRequest) {
    case 'status':
      result = { };
      result.command = 'service '+serviceName+' status';
      exec(result.command, function(error, stdout, stderr) {
        if(error) {
          result.success = false;
          result.output = stderr;
        } else {
          result.success = true;
          result.output = stdout;
        }
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify(result));
        response.end();
      });
      break;
    default:
      response.writeHead(501, {"Content-Type": "text/plain"});
      response.write('Not Implemented:'+pathArray[1]);
      response.end();
      break;
  }
}

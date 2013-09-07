var server = require ('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

var handle = { };
handle['asset'] = requestHandlers.asset;
handle['ajax'] = requestHandlers.ajax;
handle['/'] = requestHandlers.index;
handle['/show'] = requestHandlers.showDirectory;

server.start(router.route, handle);
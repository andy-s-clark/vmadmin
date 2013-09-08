// Document Ready
$(document).ready(function() {
  // Services
  var services = ['cron'
    ,'cups'
  ];

  $actionsList = $('ul.actions');
  // Create HTML elements for each service
  for (var i=0; i < services.length; i++) {
    var service = services[i];
    $actionsList.append('<li class="service-'+service+'"><img class="start" src="/asset/start.png" alt="Start" /><img class="stop" src="/asset/stop.png" alt="Stop" /><img class="restart" src="/asset/restart.png" alt="Restart" /><strong>'+service+'</strong></li>');

    $service = $actionsList.children('.service-'+service);

    $service.on('click', {service: service, request: 'status'}, function(event) {
      serviceRequest(event.data.service, event.data.request);
    });
    $service.children('.start').on('click', {service: service, request: 'start'}, function(event) {
      serviceRequest(event.data.service, event.data.request);
    });
    $service.children('.stop').on('click', {service: service, request: 'stop'}, function(event) {
      serviceRequest(event.data.service, event.data.request);
    });
    $service.children('.restart').on('click', {service: service, request: 'restart'}, function(event) {
      serviceRequest(event.data.service, event.data.request);
    });
  }

  function serviceRequest(service, request) {
    $.ajax('/ajax/service/'+service+'/'+request, {
      success:function(data) {
        if (data.success) {
          $('.web_console').html('<pre>'+data.output+'</pre>');
        } else {
          $('.web_console').html('<pre class="error">'+data.output+'</pre>');
        }
      }
    });
  }

  // TODO Poll for status of each service periodically
});
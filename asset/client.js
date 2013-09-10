// Document Ready
$(document).ready(function() {
  // Desired Services
  var desiredServices = ['cron'
    ,'cups'
    ,'bar'
  ];

  $.ajax('/ajax/serviceList', {
    success:function(services) {
      var targetServices= [];
      if (services) {
        for(var i=0; i<desiredServices.length; i++) {
          for(var j=0; j<services.length; j++) {
            if(desiredServices[i] === services[j]) {
              targetServices.push(services[j]);
              break;
            }
          }
        }
        createControls(targetServices);
      }
    }
  });

  function createControls(services) {
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
  }

  function serviceRequest(service, request) {
    $.ajax('/ajax/service/'+service+'/'+request, {
      success:function(data) {
        if (data.success) {
//           if (request === 'status') {
//             alert(request);
//             updateServiceStatusDisplay(service, data.running);
//           }
          $('.web_console').html('<pre>'+data.output+'</pre>');
        } else {
          $('.web_console').html('<pre class="error">'+data.output+'</pre>');
        }
      }
    });
  }

  function updateServiceStatusDisplay(service, running) {
    alert(running);
  }
  // TODO Poll for status of each service periodically
});
// Document Ready
$(document).ready(function() {

  // Cron Status
  $('#action_cron_status').click(function() {
    $.ajax('/ajax/service/cron/status', {
      success:function(data) {
        if (data.success) {
          $('.web_console').html('<pre>'+data.output+'</pre>');
        } else {
          $('.web_console').html('<pre class="error">'+data.output+'</pre>');
        }
      }
    });
  });

});
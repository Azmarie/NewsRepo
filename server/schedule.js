var cron = require('node-cron');
 
var task = cron.schedule('* * * * *', function(){
  console.log('running a task every minute');
});

task.start();
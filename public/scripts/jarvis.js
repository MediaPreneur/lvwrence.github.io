var request = window.superagent;
console.log('hi')

setServingText(request);
setInterval(function() {
  setServingText(request);
}, 100000);

function setServingText(request) {
  request
  .get("https://hellojarvis.herokuapp.com/metrics")
  .end(function(err, res) {
    document.getElementById('jarvis-post-num-reminders').textContent = res.body['num_reminders'];
    document.getElementById('jarvis-post-num-users').textContent = res.body['num_users'];
  });
}

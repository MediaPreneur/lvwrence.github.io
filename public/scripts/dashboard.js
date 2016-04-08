requirejs.config({
  paths: {
    "momentjs": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    "superagent": "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min"
  }
});

var moment;
require(["momentjs", "d3", "superagent"], function(momentjs, d3, request) {
  moment = momentjs;
  request
  .get("http://162.243.145.24/dashboard")
  .end(function(err, res) {
    renderDailyAverage(res.body);
    // renderCodeGraph(data["coding"]);
  });
});

function renderDailyAverage(data) {
  var dailyAverage = data['coding']['daily_average'];
  var duration = moment.duration(dailyAverage, 'seconds').humanize();
  var innerHTML = "On average, I code for <strong>" + duration + "</strong> per day."
  document.getElementById("daily-average").innerHTML = innerHTML;
}

function renderCodeGraph(data) {
  console.log(data);
  d3.select("#code").append("h1");
}

requirejs.config({
  paths: {
    momentjs: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    dimple: "http://dimplejs.org/dist/dimple.v2.1.6.min",
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min"
  }
});

var moment;
require(["momentjs", "d3", "superagent", "dimple"], function(momentjs, d3, request, dimple) {
  moment = momentjs;
  request
  .get("http://162.243.145.24/dashboard")
  .end(function(err, res) {
    renderDailyAverage(res.body);
    renderLoggedTime(res.body);
  });
});

function renderDailyAverage(data) {
  var dailyAverage = data['coding']['daily_average'];
  var duration = moment.duration(dailyAverage, 'seconds').humanize();
  var innerHTML = "On average, I code for <strong>" + duration + "</strong> per day."
  document.getElementById("daily-average").innerHTML = innerHTML;
}

function renderLoggedTime(data) {
  var loggedTime = data['coding']['past_week'];
  // massage the data a lil bit here
  loggedTime = loggedTime.map(function(obj) {
    return {
      day: obj['date'],
      hours: moment.duration(obj['total_seconds'], 'seconds').asHours()
    }
  });
	var svg = dimple.newSvg("#logged-time", 500, 400);
  var loggedTimeChart = new dimple.chart(svg, loggedTime);
  loggedTimeChart.setBounds(60, 30, 510, 305)
  var x = loggedTimeChart.addTimeAxis("x", "day", "%Y-%m-%d", "%a");
  var y = loggedTimeChart.addMeasureAxis("y", "hours");
  y.title = "Hours";
  x.floatingBarWidth = 40;
  loggedTimeChart.addSeries(null, dimple.plot.bar);
  loggedTimeChart.draw(2000);
}

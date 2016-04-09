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
    renderLoggedTime(res.body);
    renderLoggedToday(res.body);
    renderDailyAverage(res.body);
  });
});

function renderDailyAverage(data) {
  var dailyAverage = data['coding']['daily_average'];
  var duration = moment.duration(dailyAverage, 'seconds').humanize();
  var innerHTML = "On average, I code for <strong>" + duration + "</strong> per day."
  document.getElementById("daily-average").innerHTML = innerHTML;
}

function renderLoggedToday(data) {
  var loggedTime = data['coding']['logged_today'];
  var duration = moment.duration(loggedTime, 'seconds').humanize();
  var innerHTML = "I coded for <strong>" + duration + "</strong> today."
  document.getElementById("logged-today").innerHTML = innerHTML;
}

function renderLoggedTime(data) {
  var loggedTime = data['coding']['past_week'];
  // massage the data a lil bit here
  loggedTime = loggedTime.map(function(obj) {
    return {
      day: moment(obj['date']).format("MMM Do"),
      hours: moment.duration(obj['total_seconds'], 'seconds').asHours()
    }
  });
	var svg = dimple.newSvg("#logged-time", "100%", "100%");
  var loggedTimeChart = new dimple.chart(svg, loggedTime);
  loggedTimeChart.setBounds("10%", "10%", "80%", "80%")
  var x = loggedTimeChart.addCategoryAxis("x", "day");
  x.addOrderRule("day");
  var y = loggedTimeChart.addMeasureAxis("y", "hours");
  x.title = null;
  y.title = "Hours";
  loggedTimeChart.addSeries(null, dimple.plot.bar);
  loggedTimeChart.draw(2000);

  window.onresize = function() {
    loggedTimeChart.draw(0, true);
  }
}

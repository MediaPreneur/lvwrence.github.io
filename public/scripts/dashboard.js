requirejs.config({
  paths: {
    momentjs: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    dimple: "http://dimplejs.org/dist/dimple.v2.1.6.min",
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    lodash: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.9.0/lodash.min"
  }
});

var moment;
var _;
require(["momentjs", "d3", "superagent", "dimple", "lodash"], function(momentjs, d3, request, dimple, _) {
  moment = momentjs;
  _ = _;
  request
  .get("http://162.243.145.24/dashboard")
  .end(function(err, res) {
    renderLoggedTime(res.body);
    renderLoggedToday(res.body);
    renderDailyAverage(res.body);
    renderLastWorkout(res.body);
  });
  renderCurrentAge();
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
  loggedTimeChart.setBounds("5%", "5%", "90%", "80%")
  var x = loggedTimeChart.addCategoryAxis("x", "day");
  x.addOrderRule("day");
  var y = loggedTimeChart.addMeasureAxis("y", "hours");
  x.title = null;
  y.title = "Hours";
  var series = loggedTimeChart.addSeries(null, dimple.plot.bar);
  series.lineWeight = 5;
  // series.lineMarkers = true;
  series.barGap = 0.6;
  loggedTimeChart.draw(2000);

  window.onresize = function() {
    loggedTimeChart.draw(0, true);
  }
}

function renderLastWorkout(data) {
  var mostRecentWorkout;
  _.forOwn(data['lifting'], function(stats, lift) {
    var mostRecentLift = stats[0];
    var dateOfMostRecentLift = moment(mostRecentLift['date']);
    if (!mostRecentWorkout) {
      mostRecentWorkout = dateOfMostRecentLift;
    }
    if (dateOfMostRecentLift.isBefore(mostRecentWorkout)) {
      mostRecentWorkout = dateOfMostRecentLift;
    }
  });
  // now mostRecentWorkout is initialized
}

function renderCurrentAge() {
  var setAge = function() {
    var dob = moment.unix(781315200);
    var diff = moment().diff(dob);
    var age = _.round(diff / 1000 / 60 / 60 / 24 / 365, 10);
    var innerHTML = "<p>I am <strong>"+ age + "</strong> years old.</p>"
    document.getElementById("current-age").innerHTML = innerHTML;
  }

  setInterval(setAge, 100);
}

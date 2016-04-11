define(function() {
  function render(data, deps) {
    var moment = deps['moment'];

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
      loggedTimeChart.setBounds("5%", "5%", "90%", "90%")
      var x = loggedTimeChart.addCategoryAxis("x", "day");
      x.addOrderRule("day");
      var y = loggedTimeChart.addMeasureAxis("y", "hours");
      x.title = null;
      y.title = "Hours";
      var series = loggedTimeChart.addSeries(null, dimple.plot.bar);
      series.lineWeight = 5;
      // series.lineMarkers = true;
      series.barGap = 0.6;
      loggedTimeChart.draw(3000);


      var onresize = window.onresize;
      window.onresize = function () {
        if (onresize) {
          onresize();
        }
        loggedTimeChart.draw(0, true);
      }
    }

    renderDailyAverage(data);
    renderLoggedToday(data);
    renderLoggedTime(data);
  }

  return render;
});

define(function() {
  function render(data, deps) {
    var moment = deps['moment'];
    var d3 = deps['d3'];
    var c3 = deps['c3'];
    var _ = deps['_'];

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
      var x = ['x'];
      var hours = ['Hours'];
      var loggedTime = data['coding']['hours_for_past_week'];
      // massage the data a lil bit here
      _.map(loggedTime, function(obj) {
        var date = Date.parse(moment(obj['date']).format());
        var numHours = moment.duration(obj['total_seconds'], 'seconds').asHours();
        x.push(date);
        hours.push(numHours)
      });

      function generateChart() {
        var chart = c3.generate({
          bindto: '#logged-time',
          data: {
            x: 'x',
            columns: [
              x, hours
            ],
            type: 'bar'
          },
          axis: {
            x: {
              type: 'timeseries',
              tick: {
                format: '%B %d'
              }
            },
            y: {
              label: 'Hours'
            }
          },
          legend: {
            hide: true
          },
          tooltip: {
            show: false
          },
          transition: {
            duration: 1000
          }
        });
      }

      generateChart();
      var onresize = window.onresize;
      window.onresize = function () {
        if (onresize) {
          onresize();
        }
        generateChart();
      }
    }

    renderDailyAverage(data);
    renderLoggedToday(data);
    renderLoggedTime(data);
  }

  return render;
});

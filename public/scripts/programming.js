define(function() {
  function render(data, deps) {
    var $ = deps['$'];
    var _ = deps['_'];
    var moment = deps['moment'];
    var d3 = deps['d3'];
    var MG = deps['MG'];

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

			var bar_data = [
				{'label': 'first', 'value':4},
				{'label': 'second', 'value':2.1},
				{'label': 'third', 'value':6.3},
				{'label': 'fourth', 'value':5.7},
				{'label': 'fifth', 'value':5},
				{'label': 'sixth', 'value':4.2},
				{'label': 'yet another', 'value':4.2},
				{'label': 'and again', 'value':4.2},
				{'label': 'and sss', 'value':4.2}
			];

			MG.data_graphic({
				data: bar_data,
        full_width: true,
				chart_type: 'bar',
				bar_orientation: 'vertical',
				y_accessor: 'value',
				x_accessor: 'label',
				width: 295,
				height: 220,
				right: 10,
				animate_on_load: true,
				target: '#logged-time'
			});
    }

    renderDailyAverage(data);
    renderLoggedToday(data);
    renderLoggedTime(data);
  }

  return render;
});

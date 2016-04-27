define(function() {
  function render(data) {
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
      var loggedTime = data['coding']['hours_for_past_week'];

      // massage the data a lil bit here
      var data = _.map(loggedTime, function(obj) {
        var date = new Date(obj['date']).toLocaleDateString();
        var numHours = moment.duration(obj['total_seconds'], 'seconds').asHours();
        return {
          'date': date,
          'hours': numHours
        }
      });

      var labels = _.map(data, 'date');
      var hours = _.map(data, 'hours');

			var data = {
				labels: labels,
				datasets: [
					{
						data: hours,
						borderWidth: 1,
						backgroundColor: "#6baed6",
						borderColor: "#3182bd",
						hoverBackgroundColor: "#3182bd",
						hoverBorderColor: "#3182bd",
					}
				]
			};

			var ctx = document.getElementById("logged-time");
      var myChart = new Chart(ctx, {
				type: 'bar',
				data: data,
        options: {
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Hours'
              }
            }]
          }
        }
			});
    }

    renderDailyAverage(data);
    renderLoggedToday(data);
    renderLoggedTime(data);
  }

  return render;
});

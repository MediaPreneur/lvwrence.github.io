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
        var date = new Date(obj['date'])
        var numHours = moment.duration(obj['total_seconds'], 'seconds').asHours();
        return {
          'date': date,
          'hours': numHours
        }
      });

      var ctx = document.getElementById("logged-time");
      var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
					datasets: [{
						label: '# of Votes',
						data: [12, 19, 3, 5, 2, 3]
					}]
				},
				options: {
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero:true
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

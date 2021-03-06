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
            type: 'bar',
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
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var hours = tooltipItem['yLabel'];
                var duration = moment.duration(hours, 'hours');
                return duration.humanize();
              }
            }
          }
        }
			});
    }

    function renderCommitsMade(data) {
      var commits = data['coding']['commits_for_past_week'];

      // massage the data a lil bit here
      var data = _.map(commits, function(obj) {
        var date = new Date(obj['date']).toLocaleDateString();
        return {
          'date': date,
          'commits': obj['num_commits']
        }
      });

      var labels = _.map(data, 'date');
      var commits = _.map(data, 'commits');

			var data = {
				labels: labels,
				datasets: [
					{
						data: commits,
						borderWidth: 1,
						backgroundColor: "#6baed6",
						borderColor: "#3182bd",
						hoverBackgroundColor: "#3182bd",
						hoverBorderColor: "#3182bd",
					}
				]
			};

			var ctx = document.getElementById("commits-made");
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
                labelString: 'Commits'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return tooltipItem['yLabel'] + ' commits';
              }
            }
          }
        }
			});
    }

    function renderLinesChanged(data) {
      var commits = data['coding']['commits_for_past_week'];

      // massage the data a lil bit here
      var data = _.map(commits, function(obj) {
        var date = new Date(obj['date']).toLocaleDateString();
        return {
          'date': date,
          'added': obj['lines_added'],
          'removed': obj['lines_removed']
        }
      });

      var labels = _.map(data, 'date');
      var added = _.map(data, 'added');
      var removed = _.map(data, 'removed');

			var data = {
				labels: labels,
				datasets: [
					{
            data: added,
						borderWidth: 1,
						backgroundColor: "#6baed6",
						borderColor: "#3182bd",
						hoverBackgroundColor: "#3182bd",
						hoverBorderColor: "#3182bd",
					},
          {
            data: removed,
						borderWidth: 1,
						backgroundColor: "#6baed6",
						borderColor: "#3182bd",
						hoverBackgroundColor: "#3182bd",
						hoverBorderColor: "#3182bd",
					}
				]
			};

			var ctx = document.getElementById("lines-changed");
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
                labelString: 'Lines'
              }
            }]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var hours = tooltipItem['yLabel'];
                var duration = moment.duration(hours, 'hours');
                return duration.humanize();
              }
            }
          }
        }
			});
    }

    function manageTabs() {
      var tabs = document.getElementById('programming-graph-tabs');
      var loggedTime = document.getElementById('logged-time').parentNode.parentNode.parentNode.parentNode.parentNode;
      var commitsMade = document.getElementById('commits-made').parentNode.parentNode.parentNode.parentNode.parentNode;
      var linesChanged = document.getElementById('lines-changed').parentNode.parentNode.parentNode.parentNode.parentNode;

      function clickTab(tab) {
        // tabname is either "time", "commits", or "lines"
        var tabname = tab.getAttribute('data-tab');
        if (!tabname) {
          return
        }

        // clear all active
        _.map(tabs.children, function(li) {
          li.className = "";
        });
        tab.parentNode.className = "is-active";
        if (tabname === "time") {
          loggedTime.style.display = 'block';
          commitsMade.style.display = 'none';
          linesChanged.style.display = 'none';
          renderLoggedTime(data);
        } else if (tabname === "commits") {
          loggedTime.style.display = 'none';
          commitsMade.style.display = 'block';
          linesChanged.style.display = 'none';
          renderCommitsMade(data);
        } else if (tabname === "lines") {
          loggedTime.style.display = 'none';
          commitsMade.style.display = 'none';
          linesChanged.style.display = 'block';
          renderLinesChanged(data);
        }
      }

      // add event listener
      tabs.addEventListener("click", function(e) {
        clickTab(e.target);
      });

      // initialize
      clickTab(tabs.firstElementChild.firstElementChild);
    }

    renderDailyAverage(data);
    renderLoggedToday(data);
    manageTabs();
  }

  return render;
});

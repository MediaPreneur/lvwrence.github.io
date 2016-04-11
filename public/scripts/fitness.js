define(function() {
  function render(data, deps) {
    var moment = deps['moment'];
    var c3 = deps['c3'];


    function renderLastWorkout(data) {
      var mostRecentWorkout = null;
      _.forOwn(data['lifting'], function(stats, lift) {
        var mostRecentLift = stats[0];
        var dateOfMostRecentLift = moment(mostRecentLift['date']);
        if (mostRecentWorkout === null) {
          mostRecentWorkout = dateOfMostRecentLift;
        }
        if (dateOfMostRecentLift.isSameOrAfter(mostRecentWorkout)) {
          mostRecentWorkout = dateOfMostRecentLift;
        }
      });
      // now mostRecentWorkout is initialized
      var innerHTML = "<p>My last workout was <strong>" + mostRecentWorkout.fromNow() + "</strong>.</p>"
      document.getElementById("last-workout").innerHTML = innerHTML;
    }

    function renderCurrentAge(data) {
      var setAge = function() {
        var now = Date.now();
        var dob = 781315200000;
        var diff = now - dob;
        var age = diff / 1000 / 60 / 60 / 24 / 365;
        var age = age.toFixed(9);
        var innerHTML = "<p>I am <strong>"+ age + "</strong> years old.</p>"
        document.getElementById("current-age").innerHTML = innerHTML;
      }
      setInterval(setAge, 1);
    }

    function renderLiftProgress(data) {
      function generateChart() {
        var chart = c3.generate({
            bindto: '#lift-progress',
            data: {
                xs: {
                  'Overhead Press': 'x1',
                  'Bench': 'x2',
                  'Squat': 'x3',
                  'Deadlift': 'x4'
                },
                columns: [
                    ['x1', '2016-03-23', '2016-03-28', '2016-04-03'],
                    ['x2', '2016-03-21', '2016-03-26', '2016-03-30', '2016-04-05'],
                    ['x3', '2016-03-21', '2016-03-23', '2016-03-26', '2016-03-28', '2016-03-30', '2016-04-03', '2016-04-05'],
                    ['x4', '2016-03-23', '2016-03-28', '2016-04-03'],
                    ['Overhead Press', 95, 95, 95],
                    ['Bench', 135, 140, 145, 145],
                    ['Squat', 275, 280, 285, 285, 285, 290, 290],
                    ['Deadlift', 135, 145, 185],
                ]
            },
            axis: {
                x: {
                    type: 'timeseries',
                    tick: {
                        format: '%Y-%m-%d'
                    }
                }
            },
            tooltip: {
              show: false
            },
            transition: {
              duration: 3000
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

    renderLastWorkout(data);
    renderCurrentAge(data);
    renderLiftProgress(data);
  }

  return render;
});

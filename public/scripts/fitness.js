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
        var dob = moment.unix(781315200);
        var diff = moment().diff(dob);
        var age = _.round(diff / 1000 / 60 / 60 / 24 / 365, 10);
        var innerHTML = "<p>I am <strong>"+ age + "</strong> years old.</p>"
        document.getElementById("current-age").innerHTML = innerHTML;
      }
      setInterval(setAge, 100);
    }

    function renderLiftProgress(data) {
      c3.generate({
          bindto: '#lift-progress',
          data: {
              x: 'x',
              columns: [
                  ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
                  ['data1', 30, 200, 100, 400, 150, 250],
                  ['data2', 130, 340, 200, 500, 250, 350]
              ]
          },
          axis: {
              x: {
                  type: 'timeseries',
                  tick: {
                      format: '%Y-%m-%d'
                  }
              }
          }
      });
    }

    renderLastWorkout(data);
    renderCurrentAge(data);
    renderLiftProgress(data);
  }

  return render;
});

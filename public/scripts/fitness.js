define(function() {
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

  function render(data) {
    renderLastWorkout(data);
    renderCurrentAge(data);
  }

  return render;
});

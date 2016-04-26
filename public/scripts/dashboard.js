requirejs.config({
  paths: {
    momentjs: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    metricsgraphics: "https://cdnjs.cloudflare.com/ajax/libs/metrics-graphics/2.9.0/metricsgraphics.min",
    jquery: "https://code.jquery.com/jquery-2.2.3.min",
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    lodash: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.9.0/lodash.min",
  }
});

require(["momentjs", "d3", "metricsgraphics", "jquery", "superagent", "lodash", "programming", "fitness"],
function(moment, d3, MG, $, request, _, renderProgramming, renderFitness) {
  console.log($);
  console.log(MG);
  var dashboardDisplay = document.getElementById('dashboard-container');
  var dashboardLoading = document.getElementById('dashboard-loading');

  var deps = {
    moment: moment,
    d3: d3,

    _: _
  };

  request
  .get("https://lawrencewu.herokuapp.com/dashboard")
  .end(function(err, res) {
    dashboardDisplay.style.display = 'block';
    dashboardLoading.style.display = 'none';

    var data = res.body;
    renderProgramming(data, deps);
    renderFitness(data, deps);
  });
});

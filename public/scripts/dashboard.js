requirejs.config({
  paths: {
    momentjs: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    dimple: "http://dimplejs.org/dist/dimple.v2.1.6.min",
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    lodash: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.9.0/lodash.min",
    c3: "https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min"
  }
});

require(["momentjs", "d3", "superagent", "dimple", "lodash", "c3", "programming", "fitness"],
function(moment, d3, request, dimple, _, c3, renderProgramming, renderFitness) {
  var dashboardDisplay = document.getElementById('dashboard-container');
  var dashboardLoading = document.getElementById('dashboard-loading');

  var deps = {
    moment: moment,
    d3: d3,
    c3: c3,
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

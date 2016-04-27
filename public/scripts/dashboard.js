requirejs.config({
  paths: {
    momentjs: "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.0/d3.min",
    metricsgraphics: "https://cdnjs.cloudflare.com/ajax/libs/metrics-graphics/2.8.0/metricsgraphics.min",
    jquery: "https://code.jquery.com/jquery-2.2.3.min",
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    lodash: "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.9.0/lodash.min"
  }
});

require(["momentjs", "d3", "metricsgraphics", "jquery", "superagent", "lodash", "programming", "fitness"],
function(moment, d3, MG, $, request, _, renderProgramming, renderFitness) {
  var deps = {
    $: $,
    _: _,
    moment: moment,
    d3: d3,
    MG: MG
  };

  request
  .get("https://lawrencewu.herokuapp.com/dashboard")
  .end(function(err, res) {
		document.getElementById('dashboard-container').style.display = 'block';
		document.getElementById('dashboard-loading').style.display = 'none';

    var data = res.body;
    renderProgramming(data, deps);
    renderFitness(data, deps);
  });
});

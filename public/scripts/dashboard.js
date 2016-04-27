requirejs.config({
  paths: {
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
  }
});

require(["superagent", "programming", "fitness"],
function(request, renderProgramming, renderFitness) {
  request
  .get("https://lawrencewu.herokuapp.com/dashboard")
  .end(function(err, res) {
		document.getElementById('dashboard-container').style.display = 'block';
		document.getElementById('dashboard-loading').style.display = 'none';

    var data = res.body;
    renderProgramming(data);
    // renderFitness(data, deps);
  });
});

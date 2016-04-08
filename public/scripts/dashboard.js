requirejs.config({
  paths: {
    "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.1.0/Chart.min",
    "momentjs": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min",
    "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min"
  }
});

var moment;
require(["chartjs", "momentjs", "d3"], function(Chart, momentjs, d3) {
  moment = momentjs;
  atomic
    .get("http://162.243.145.24/dashboard")
    .success(function(data, xhr) {
      renderCodeGraph(data["coding"]);
    })
    .error(function(data, xhr) {
      console.log(data);
    });
});


function renderCodeGraph(data) {
  console.log(data);
  d3.select("#code").append("h1");
}

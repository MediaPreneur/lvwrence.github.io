requirejs.config({
  paths: {
    "chartjs": "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.1.0/Chart.min",
    "momentjs": "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min"
  }
});

var moment;
require(["chartjs", "momentjs"], function(Chart, momentjs) {
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
  var timeInHours = data["past_week"].map(function(seconds) {
    var d = moment.duration(seconds, "seconds");
    return d.asHours()
  });

  labels = [
    moment().subtract(6, "days").format("dddd"),
    moment().subtract(5, "days").format("dddd"),
    moment().subtract(4, "days").format("dddd"),
    moment().subtract(3, "days").format("dddd"),
    moment().subtract(2, "days").format("dddd"),
    moment().subtract(1, "days").format("dddd"),
    moment().format("dddd")
  ]

  var data = {
    labels: labels,
    datasets: [
			{
				label: "My First dataset",
				fillColor: "rgba(220,220,220,0.5)",
				strokeColor: "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
        data: timeInHours
      }
    ]
  };

  var ctx = document.getElementById("codeLog").getContext("2d");
  var codeChart = new Chart(ctx).Bar(data)
}

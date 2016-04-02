d3.json("http://162.243.145.24/dashboard", function(err, data) {
  if (err) {
    console.warn(err);
  }
  console.log(data);

  renderCodeGraph(data["coding"]);
  renderLiftTable(data["lifting"]);
})

function renderCodeGraph(data) {
  var timeInHours = data["past_week"].map(function(seconds) {
    var d = moment.duration(seconds, "seconds");
    return d.asHours()
  });

  var loggedCodingData = [
    {
      x: [
        moment().subtract(6, "days").format("dddd"),
        moment().subtract(5, "days").format("dddd"),
        moment().subtract(4, "days").format("dddd"),
        moment().subtract(3, "days").format("dddd"),
        moment().subtract(2, "days").format("dddd"),
        moment().subtract(1, "days").format("dddd"),
        moment().format("dddd")
      ],
      y: timeInHours,
      type: "scatter"
    }
  ];
  var layout = {
    title: "Logged Time",
    font: {
    },
    yaxis: {
      title: "hours"
    }
  };

  Plotly.newPlot("codeChart", loggedCodingData, layout, {displayModeBar: false, staticPlot: true});
}

function renderLiftTable(data) {
}

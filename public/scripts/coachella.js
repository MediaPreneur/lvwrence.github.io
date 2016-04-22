requirejs.config({
	paths: {
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    c3: "https://cdnjs.cloudflare.com/ajax/libs/c3/0.4.10/c3.min"
	},
});

require(["superagent", "d3", "c3"], function(request, d3, c3) {
  request
  .get("https://raw.githubusercontent.com/lvwrence/coachella/master/friday.json")
  .end(function(err, res) {
    var body = JSON.parse(res.text);
    var data = body['activities-heart-intraday']['dataset'];
    var xs = data.map(function(obj) {
      return obj['time'];
    });
    var hr = data.map(function(obj) {
      return obj['value'];
    });

    c3.generate({
      bindto: '#friday',
      data: {
        x: 'x',
        xFormat: '%H:%M:%S',
        columns: [
          ['x'].concat(xs),
          ['heartrate'].concat(hr),
        ],
        type: 'spline'
      },
      regions: [
      ],
      zoom: {
        enabled: true
      },
      tooltip: {
        format: {
          value: function(name, ratio, id, index) {
            console.log(index);
          }
        }
      },
      point: {
        show: false
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%H:%M'
          }
        },
        y: {
          label: 'bpm'
        }
      }
    });
  });
});

requirejs.config({
	paths: {
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    metricsgraphics: "https://cdnjs.cloudflare.com/ajax/libs/metrics-graphics/2.9.0/metricsgraphics.min",
    jquery: "https://code.jquery.com/jquery-2.2.3.min"
	},
});

require(["superagent", "d3", "metricsgraphics"], function(request, d3, MG) {
  // FRIDAY
  request
  .get("https://raw.githubusercontent.com/lvwrence/coachella/master/friday.json")
  .end(function(err, res) {
    var body = JSON.parse(res.text);
    var data = body['activities-heart-intraday']['dataset'];
    var data = data.map(function(obj) {
      var time = moment("2016-04-15 " + obj["time"], "YYYY-MM-DD HH:mm:ss");
      return {
        "date": time.toDate(),
        "value": obj["value"]
      };
    });

    var markers = [{
        'date': new Date(2016, 3, 15, 3, 0, 0),
        'label': 'Look, a spike!'
    }];

    MG.data_graphic({
        data: data,
        full_width: true,
        height: 300,
        right: 40,
        markers: markers,
        target: '#friday'
    });
  });

  // SATURDAY
  request
  .get("https://raw.githubusercontent.com/lvwrence/coachella/master/saturday.json")
  .end(function(err, res) {
    var body = JSON.parse(res.text);
    var data = body['activities-heart-intraday']['dataset'];
    var data = data.map(function(obj) {
      var time = moment("2016-04-16 " + obj["time"], "YYYY-MM-DD HH:mm:ss");
      return {
        "date": time.toDate(),
        "value": obj["value"]
      };
    });

    var markers = [{
        'date': new Date(2016, 3, 16, 3, 0, 0),
        'label': 'Look, a spike!'
    }];

    MG.data_graphic({
        data: data,
        full_width: true,
        height: 300,
        right: 40,
        markers: markers,
        target: '#saturday'
    });
  });


  // SUNDAY
  request
  .get("https://raw.githubusercontent.com/lvwrence/coachella/master/sunday.json")
  .end(function(err, res) {
    var body = JSON.parse(res.text);
    var data = body['activities-heart-intraday']['dataset'];
    var data = data.map(function(obj) {
      var time = moment("2016-04-17 " + obj["time"], "YYYY-MM-DD HH:mm:ss");
      return {
        "date": time.toDate(),
        "value": obj["value"]
      };
    });

    var markers = [{
        'date': new Date(2016, 3, 17, 3, 0, 0),
        'label': 'Look, a spike!'
    }];

    MG.data_graphic({
        data: data,
        full_width: true,
        height: 300,
        right: 40,
        markers: markers,
        target: '#sunday'
    });
  });
});

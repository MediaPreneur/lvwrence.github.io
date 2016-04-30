requirejs.config({
	paths: {
    superagent: "https://cdnjs.cloudflare.com/ajax/libs/superagent/1.2.0/superagent.min",
    d3: "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.16/d3.min",
    metricsgraphics: "https://cdnjs.cloudflare.com/ajax/libs/metrics-graphics/2.9.0/metricsgraphics.min",
    jquery: "https://code.jquery.com/jquery-2.2.3.min"
	},
});

require(["superagent", "d3", "metricsgraphics"], function(request, d3, MG) {
  // check for mobile, and if it is then just show static images
  var md = new MobileDetect(window.navigator.userAgent);
  if (md.is('mobile')) {
    $('#friday').append($('<a href="/public/images/friday.png"><img src="/public/images/friday.png" style="width: 100%;" /></a>'));
    $('#saturday').append($('<a href="/public/images/saturday.png"><img src="/public/images/saturday.png" style="width: 100%;" /></a>'));
    $('#sunday').append($('<a href="/public/images/saturday.png"><img src="/public/images/sunday.png" style="width: 100%;" /></a>'));
  } else {
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

    var markers = [
      {
        'date': new Date(2016, 3, 15, 4, 45, 0),
        'label': 'Wake up'
      },
      {
        'date': new Date(2016, 3, 15, 6, 30, 0),
        'label': 'Flight'
      },
      {
        'date': new Date(2016, 3, 15, 9, 45, 0),
        'label': 'Arrive'
      },
      {
        'date': new Date(2016, 3, 15, 12, 0, 0),
        'label': 'Set up tent'
      },
      {
        'date': new Date(2016, 3, 15, 17, 15, 0),
        'label': 'DJ Mustard',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=cZaJYDPY-YQ', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 15, 22, 05, 0),
        'label': 'Jack Ü',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=nntGTK2Fhb0', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 15, 23, 10, 0),
        'label': 'LCD Soundsystem',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=9L8yEDcZ-QI', '_blank');
        }
      },
    ];

    MG.data_graphic({
        data: data,
        full_width: true,
        full_height: true,
        right: 40,
        markers: markers,
				target: '#friday',
				mouseover: function(d, i) {
          var time = moment(d['date']).format("H:mm");
					// custom format the rollover text, show days
					var prefix = d3.formatPrefix(d.value);
					d3.select('#friday svg .mg-active-datapoint')
					.text(time + ' - ' + d['value'] + ' bpm');
				},
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

    var markers = [
      {
        'date': new Date(2016, 3, 16, 1, 0, 0),
        'label': 'Sleep'
      },
      {
        'date': new Date(2016, 3, 16, 9, 0, 0),
        'label': 'Wake up'
      },
      {
        'date': new Date(2016, 3, 16, 16, 55, 0),
        'label': 'Run the Jewels',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=OZiymsOX6To', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 16, 19, 35, 0),
        'label': 'Disclosure',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=fB63ztKnGvo', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 16, 22, 30, 0),
        'label': 'Guns N\' Roses',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=1w7OgIMMRc4', '_blank');
        }
      },
    ];

    MG.data_graphic({
        data: data,
        full_width: true,
        full_height: true,
        right: 40,
        markers: markers,
        target: '#saturday',
        mouseover: function(d, i) {
          var time = moment(d['date']).format("H:mm");
					// custom format the rollover text, show days
					var prefix = d3.formatPrefix(d.value);
					d3.select('#saturday svg .mg-active-datapoint')
					.text(time + ' - ' + d['value'] + ' bpm');
				}
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

    var markers = [
      {
        'date': new Date(2016, 3, 17, 0, 15, 0),
        'label': 'RL Grime',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=04ufimjXEbA', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 17, 1, 55, 0),
        'label': 'Sleep'
      },
      {
        'date': new Date(2016, 3, 17, 8, 0, 0),
        'label': 'Wake up',
      },
      {
        'date': new Date(2016, 3, 17, 16, 50, 0),
        'label': 'Hudson Mohawke',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=k_MWuP2Qj7U', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 17, 19, 30, 0),
        'label': 'Major Lazer',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=YqeW9_5kURI', '_blank');
        }
      },
      {
        'date': new Date(2016, 3, 17, 21, 35, 0),
        'label': 'Flume',
        'click': function() {
          window.open('https://www.youtube.com/watch?v=Ly7uj0JwgKg', '_blank');
        }
      }
    ];

    MG.data_graphic({
        data: data,
        full_width: true,
        full_height: true,
        right: 40,
        markers: markers,
        target: '#sunday',
        mouseover: function(d, i) {
          var time = moment(d['date']).format("H:mm");
					// custom format the rollover text, show days
					var prefix = d3.formatPrefix(d.value);
					d3.select('#sunday svg .mg-active-datapoint')
					.text(time + ' - ' + d['value'] + ' bpm');
				}
    });
  });
  }
});

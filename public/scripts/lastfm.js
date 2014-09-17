atomic.get('http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=Crook--&api_key=e2374a71d02582d469e0604eb87ace84&format=json').success(function (data, xhr) {
  var mostRecentTrack = data["recenttracks"]["track"][0];
  if (mostRecentTrack["@attr"]["nowplaying"] == "true") {
    var name = mostRecentTrack["name"];
    var artist = mostRecentTrack["artist"]["#text"];

    document.getElementById("currently-playing").innerHTML = "currently listening to " + name + " by " + artist;
  }
})

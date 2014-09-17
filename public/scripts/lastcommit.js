function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);
    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
atomic.get("https://dl.dropboxusercontent.com/u/71948195/last-commit").success(function (data, xhr) {
  var time = new Date(data * 1000);

  document.getElementById("last-commit").innerHTML = "last commit " + timeSince(time) + " ago";
  console.log(timeSince(time) + " ago");
})

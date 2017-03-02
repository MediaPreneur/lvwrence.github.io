function checkAndSetCurrentlyPlaying() {
  db.ref('current_song/lawrence').on('value', function(snapshot) {
    var currentSong = snapshot.val()
    var name = currentSong['song']['metadata']['title'];
    var artist = currentSong['song']['metadata']['artist'];
    var currentlyListeningTo = "currently listening to " + name;
    if (artist != null) {
      currentlyListeningTo += " by " + artist;
    }
    document.getElementById("currently-playing").innerHTML = currentlyListeningTo
  })
}

checkAndSetCurrentlyPlaying();

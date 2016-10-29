var possibleImages = [
  'av1.png',
  'av2.jpg',
  // 'av3.jpg',
  'av4.jpg',
  'av5.jpg',
  // 'av6.jpg',
  'av7.jpg',
  'av8.jpg',
  'av9.jpg',
];

// make sure we don't see the same av consecutively
if (localStorage.getItem('av')) {
  var av = localStorage.getItem('av');
  var i = possibleImages.indexOf(av);
  if (i > -1) {
    possibleImages.splice(i, 1);
  }
}

// choose an avatar
var image = possibleImages[Math.floor(Math.random() * possibleImages.length)];

// set DOM to chosen av
document.getElementById("av").src = "/public/images/" + image;

// save current av to localstorage
localStorage.setItem('av', image);

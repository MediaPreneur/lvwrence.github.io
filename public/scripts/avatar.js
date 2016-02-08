var possibleImages = [
  'av1.png',
  'av2.jpg',
  'av3.jpg',
  'av4.jpg',
];
var image = possibleImages[Math.floor(Math.random() * possibleImages.length)];

document.getElementById("av").src = "/public/images/" + image;

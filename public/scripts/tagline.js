var SPECIAL_INTERACTIVE_TAGLINE = 'SPECIAL_INTERACTIVE_TAGLINE';

var possibleTaglines = [
  SPECIAL_INTERACTIVE_TAGLINE,
  '((λ (x) (rot13 x)) "ynjerapr")',
  '43°41\'22.6" N, 79°17\'45.1" W',
  '43°39\'34.6" N, 79°23\'50.4" W',
  '37°47\'12.1" N, 122°23\'59.4" W',
  '(◕ᴥ◕)',
  '"hello world":: [Char]',
  'console.log("hello world");',
  'printf("hello world\\n");',
  'std::cout << "hello world" << std::endl;',
  'print("hello world")',
  'NSLog("hello world");'
];

// make sure we don't see the same tagline consecutively
if (localStorage.getItem('tagline')) {
  var tagline = localStorage.getItem('tagline');
  var i = possibleTaglines.indexOf(tagline);
  if (i > -1) {
    possibleTaglines.splice(i, 1);
  }
}

// choose a tagline
var tagline = possibleTaglines[Math.floor(Math.random() * possibleTaglines.length)];

// set DOM to chosen tagline but do special logic if it's the SPECIAL one
if (tagline === SPECIAL_INTERACTIVE_TAGLINE) {
  function renderCurrentAgeInTagline() {
    var now = Date.now();
    var dob = 781315200000;
    var diff = now - dob;
    var age = diff / 1000 / 60 / 60 / 24 / 365;
    var fixedAge = age.toFixed(9);
    // do some special rendering logic
    var specialTagline = '{"status": "200 OK", "data": {"name": "lawrence", "age": ' + fixedAge + ', "location": "montreal"}}';
    document.getElementsByClassName("lead")[0].innerHTML = specialTagline;
  }
  setInterval(renderCurrentAgeInTagline, 1);
  } else {
  document.getElementsByClassName("lead")[0].innerHTML = tagline;
}

// save current tagline to localstorage
localStorage.setItem('tagline', tagline);

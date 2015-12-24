var possibleTaglines = [
  '((λ (x) (rot13 x)) "ynjerapr")', // outputs "lawrence"
  '43°41\'22.6" N, 79°17\'45.1" W', // the danforth
  '43°39\'34.6" N, 79°23\'50.4" W', // bahen
  '37°47\'12.1" N, 122°23\'59.4" W', // yelp
  '{"status": "200 OK", "data": {"name": "lawrence", "age": 21, "location": "toronto"}}',
  '(◕ᴥ◕)'
];
var tagline = possibleTaglines[Math.floor(Math.random() * possibleTaglines.length)];

document.getElementsByClassName("lead")[0].innerHTML = tagline;

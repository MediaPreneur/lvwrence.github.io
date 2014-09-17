var terribleVariableName = [
  '((λ (x) (rot13 x)) "ynjerapr")',
  '43°41\'22.6" N, 79°17\'45.1" W',
];
var p = terribleVariableName[Math.floor(Math.random() * terribleVariableName.length)];

document.getElementsByClassName("lead")[0].innerHTML = p;

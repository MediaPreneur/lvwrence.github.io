---
layout: post
title: Hacking 4 Yeezys
---

This week, [Slam Jam Socialism](http://www.slamjamsocialism.com/) ran an
[online arcade](http://www.slamjamsocialism.com/arcad-ism) for a chance to win
some Yeezy Boost 350s. My friend Marc sent me the link and asked if I could
hack the leaderboards and cop some shoes. Here's how I did it.

<img src="http://i.imgur.com/H0AsTXQ.gif" style="max-width: 80%; margin: 0 auto;" />

The game was a single-player version of Pong, written in plain JavaScript
using `<canvas>`. Each time the ball hits a paddle, you get a point and it
speeds up until you inevitably lose. While playing the game, I had Chrome's
Network tab open to see how it reported actions to the server.

<img src="http://i.imgur.com/2WhT8MP.png" style="max-width: 80%; margin: 0 auto;" />

So: every time you lose, the game sends a POST request to the site at
`/callback.php` along with some parameters. Most notably, `pointz`.
So you can just send a new request and set
`pointz` to 99999, right? As I soon discovered, it's not that easy. When I
tried it, I got an error message: `"Sorry, please try again"`. Hmm, my request
was almost identical to the legitimate one, though. But what's `sec`? It looks
like a random hash...

Turns out that `sec` stands for _secret_, and the score is one of the inputs to
the hash. If the server's hash doesn't match yours, then your score gets
rejected. The hash must be generated client-side, so I just need to look
through the source to find out where the POST request is sent:

{% highlight javascript %}
    var _0x4d74=["...","\x73\x70\x6C\x69\x74","...","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65","\x72\x65\x70\x6C\x61\x63\x65","\x5C\x77\x2B","\x5C\x62","\x67"];eval(function(_0x3e69x1,_0x3e69x2,_0x3e69x3,_0x3e69x4,_0x3e69x5,_0x3e69x6){_0x3e69x5=function(_0x3e69x3){return (_0x3e69x3<_0x3e69x2?_0x4d74[4]:_0x3e69x5(parseInt(_0x3e69x3/_0x3e69x2)))+((_0x3e69x3=_0x3e69x3%_0x3e69x2)>35?String[_0x4d74[5]](_0x3e69x3+29):_0x3e69x3.toString(36))};if(!_0x4d74[4][_0x4d74[6]](/^/,String)){while(_0x3e69x3--){_0x3e69x6[_0x3e69x5(_0x3e69x3)]=_0x3e69x4[_0x3e69x3]||_0x3e69x5(_0x3e69x3)};_0x3e69x4=[function(_0x3e69x5){return _0x3e69x6[_0x3e69x5]}];_0x3e69x5=function(){return _0x4d74[7]};_0x3e69x3=1};while(_0x3e69x3--){if(_0x3e69x4[_0x3e69x3]){_0x3e69x1=_0x3e69x1[_0x4d74[6]]( new RegExp(_0x4d74[8]+_0x3e69x5(_0x3e69x3)+_0x4d74[8],_0x4d74[9]),_0x3e69x4[_0x3e69x3])}};return _0x3e69x1}(_0x4d74[0],62,436,_0x4d74[3][_0x4d74[2]](_0x4d74[1]),0,{}))
{% endhighlight %}

The game is somehow in hex. No, wait—they're variables but
they just look like memory addresses. That `eval` is the code that gets executed. We can just `console.log`
what is getting `eval`ed:

{% highlight javascript %}
$(document).ready(function(){window.addEventListener("load",function(){window.scrollTo(0,0)});var fbb=navigator.appVersion.indexOf("FBAN");if(fbb>-1){var fbbh=44}else{var fbbh=0}var canvas=document.getElementById("canvas"),ctx=canvas.getContext("2d"),W=$(window).width(),H=$(window).height()-fbbh,particles=[],ball={},paddles=[2],mouse={},points=0,fps=60,particlesCount=3,flag=0,particlePos={},multipler=1,startBtn={},restartBtn={},over=0,init,paddleHit;var mq=window.matchMedia("(min-width: 768px)");if(mq.matches){var offset=0}else{var offset=50}function player(){window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(callback){return window.setTimeout(callback,1000/60)}})();window.cancelRequestAnimFrame=(function(){return window.cancelAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame||window.oCancelRequestAnimationFrame||window.msCancelRequestAnimationFrame||clearTimeout})();canvas.addEventListener("mousemove",trackPosition,true);canvas.addEventListener("mousedown",btnClick,true);canvas.addEventListener("touchmove",trackPositionT,true);canvas.addEventListener("touchend",btnClick,true);collision=document.getElementById("collide");collisionWall=document.getElementById("collide_wall");canv...
{% endhighlight %}

This is a lot better, but it's still minified. Luckily, there's [jsnice](http://www.jsnice.org/)
to prettify it for us:

{% highlight javascript %}
  // some code above...
  function start() {
  // some code here...
    over = 1;
    $.ajax({
      method : "POST",
      url : "callback-ism.php",
      data : {
        action : "setpoint",
        email : email,
        pointz : y,
        sec : s(email, y, token)
      }
    }).done(function(opt_classNames) {
	// more code below...
{% endhighlight %}

Well that worked way better than I expected. So `sec` is generated from a function
`s`, which takes in `email`, `y` (which is pointz), and `token`. What's `s`?

{% highlight javascript %}
function s(email, val, v) {
  md5_iterations = parseInt(v.substring(0, 1));
  multiplier = parseInt(v.substring(4, 5));
  divider = parseInt(v.substring(17, 18));
  hash_calc = Math.ceil(val * multiplier / divider) + v + email;
  md5_iteration = 1;
  for (;md5_iteration <= md5_iterations;md5_iteration++) {
    hash_calc = m(hash_calc);
  }
  return hash_calc;
}
{% endhighlight %}

The hash is produced from iteratively hashing substrings of my email, the
points I scored, and a token generated on each session that's set server-side.
Now all that's left to do is calculate the hash of the number of points I want,
and replace the parameters in the curl request with my new score and hash.

<div style="max-width: 80%; margin: 0 auto;">
	<img style="width: 100%" src="http://i.imgur.com/E1AMbgE.png"/>
	<p style="text-align: center; max-width: 100%; margin: 0 auto;">rekt</p>
</div>

I still didn't win the Yeezys though

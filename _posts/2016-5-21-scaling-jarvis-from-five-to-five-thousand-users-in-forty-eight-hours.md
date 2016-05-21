---
layout: post
title: Scaling Jarvis from 5 to 5000 users in forty-eight hours
---

Last Saturday, [Daniel](http://danielballe.com/) and I were ready to launch our side project, [Jarvis](http://hellojarvis.io), to
the world. We had been building and dogfooding it for about three weeks and
were excited for people other than our friends—real people—to try it out. We
posted the link on reddit and Product Hunt and...not much happened. About 15
or so people briefly messaged Jarvis and then left. We went home, dejected, and
slept.

Two days later, Jarvis had over 5000 users and got featured on some [cool sites](https://www.producthunt.com/tech/jarvis-2)
[like these](http://lifehacker.com/jarvis-is-a-facebook-chat-bot-that-can-handle-your-remi-1776834190?utm_campaign=socialflow_lifehacker_facebook&utm_source=lifehacker_facebook&utm_medium=socialflow). We have now sent <span id="jarvis-post-num-reminders">over 13000</span> reminders to <span id="jarvis-post-num-users">over 8000</span> users,
and migrated our parser to wit.ai. But in the crucial first forty-eight hours, here's how things went down.

**Hours 0-12**
I woke up in the middle of the night and checked Product Hunt and we were right
there, trending on the front page. People were actually trying Jarvis out. I
checked the Heroku logs. Holy shit, logs were scrolling down the screen like in
the Matrix. All was well and good, until we stopped responding to messages. Ruh
roh. I checked the logs again. 500s all over the place. Jarvis was down. Someone
sent some weird unicode that we didn't decode properly. Fuck fuck fuck. I woke
Daniel up and he got to debugging the issue while I messaged all our new users
to tell them that we were having issues and could they please hold on for a
second. 15 minutes later, Daniel pushed a fix. Thank god. We could rest
easy...for about five minutes, when something else broke. We ran into our Google
Maps Geocoding API limit of 2,500 requests per day. We quickly generated a new
API key but Google said it could take a while. Meanwhile, a ton of people were
messaging Jarvis and probably bouncing because he was unresponsive. My palms
were sweaty but my knees and arms were alright. This was the most exciting
time of my life, except for the time I played this really good guy at Smash 64
at a tournament. 10 minutes later we were seeing 200s again. Luckily, Facebook
buffers any requests that didn't get 200 so we could still backfill the missed
requests. We went back to sleep soon after that little incident.

**Lesson learned**: I don't know, something about unicode.

**Hours 12-24**
We grabbed brunch nearby and started talking about our future billions. I upgraded
our dynos and went home and <del>created a test framework</del> continued writing good tests
like any good software developer who always writes good tests.

**Lesson learned**: Nothing much, really. Things were pretty good at this point.

**Hours 24-36**
Monday morning. I woke up and everything was on fire. I checked the logs and
we were down again. Goddammit. We were getting hit with 150 requests
per minute thanks to the Lifehacker article. Luckily, the fix was super
straightforward (we had missed a unicode conversion)  and I pushed it like
five minutes after waking up #mlgskills #realtalk. Jarvis was down for a
total of about 30 minutes at this point, and we probably lost a bunch of
traffic. Oh well, not much we can do about that. Then our Redis cluster
started getting really slow. Like, 1 second per query slow. It may have
had something to do with us just stuffing all our data into two keys. Then
we lost connection to the cluster and dropped some users. This was not
good. I contacted RedisToGo and they told me they were investigating it.
Eventually they managed to recover the cluster and upgrade the memory but
we had lost about a thousand users during that time. I started building a
Postgres backend because this Redis thing was clearly getting unsustainable.

**Lesson learned**: Use Redis for caching or message brokering and a real
database for database things. Don't stuff all your data into a Redis list
and iterate through the list to find things. This is inefficient.

**Hours 36-48**
Things are getting stable. It looked like we were going to hit our API limit
with Google again but if you attach your credit card to your developer account
you can pay 50 cents for every extra 1000 requests. This is a pretty good deal,
so we did it. We also finished the migration from Redis to Postgres with very
few problems. We were still getting a shitton of users and my ex started talking
to me again. Things are looking pretty good.

**Lesson learned**: Make tiny products that have a disproportionately large
return on investment. Build things people want. Don't dump someone for no good reason.

<script src="/public/scripts/jarvis.js" defer></script>

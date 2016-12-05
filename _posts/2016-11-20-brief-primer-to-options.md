---
layout: post
title: A Brief Primer on Options
---

Options are a really interesting type of financial security. They are themselves part of a broader group of securities
called derivatives. Derivatives, as the name suggests, derive their value from something else. This "something else" can
be a stock, the outcome of some event, or even another derivative! Anyway, let's focus on options, which typically derive
their value from the price of a stock.

An option is essentially a contract between two parties that gives the buyer of the option the right to buy or the right
to sell some underlying thing at a specified price. This is useful for a few reasons. If I think a stock's price will go
down, I can buy the right to sell the stock at some price and at some point in the future. This price is called the "strike
price" and that point in time in the future is called the "expiration date". The person that sells me this option must buy
the stock from me at the strike price, if I choose so. Now, if I'm right and the stock price does go down way below the
specified price, then I've made money: I can just buy the stock at its current low price and sell it to whoever wrote me
the option at the strike price. If, however, I'm wrong and the stock price goes up, or doesn't go down enough for me to
make more money than I've spent on the option itself (this is called the premium), then I've lost money and the person
who sold me the option gets to keep the premium. This is another reason options are useful. In traditional short selling,
you borrow and then immediately sell shares in the hopes that the price goes down and you can buy them back later at a
lower price. But you *must* buy them back, so if the stock happens to go up tremendously then you must pay that tremendous
price. So in traditional short selling, the downside is unlimited, while with put options, the downside is capped at the
cost of the premium.

What I just described was a put option, which gives me the right to *sell* the underlying. We can also purchase the right
to *buy* some stock at some strike price. This is called a call option. Call options work pretty much exactly inversely to
puts: I can buy an option to buy a stock at a certain price, and if that stock goes up way past that price, then I'll exercise
my option and sell it immediately at the higher market price. And if the stock price doesn't budge or goes down by expiry,
then I won't exercise the option and lose my premium. Now, let's go through another example, with some actual numbers. Last
week, Netflix had its earnings report and its stock soared by over 20%, from about $100 to $126. Now, if I had $1000, I could
have bought ten shares of NFLX and made a $260 profit, which isn't bad. But I could have also bought 200 NFLX call options at
a strike price of $100 for about $5 each. That would have netted me a whopping $3000 profit from the same outcome. This is how
we can use options as leverage and get a greater return on investment. Of course, there's no free lunch: I easily could have
lost the whole $1000 if the price didn't go past $100, since there would be no point in exercising the options. Meanwhile, I
would have still made some profit had I flat-out bought the shares.

One more thing. There is yet another parameter in options, and that is the style. If the option is American-style, then you
can exercise the option anytime until expiration. If the option is European-style, then you can only exercise it on the expiry
date. There are other, more esoteric styles, but most people typically use American options.

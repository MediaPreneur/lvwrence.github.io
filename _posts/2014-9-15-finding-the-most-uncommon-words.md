---
layout: post
title: Finding the most uncommon words
---
Did you know that the URLs generated in [Berri](http://berri.io/) aren't
short hashes but actually just really uncommon English words? If you
thought your room name was randomly generated because it's
unrecognizable, it might be interesting to look up what the
definition is. Anyway, getting a list of uncommon words isn't
too complicated, but it is fun and I wanted to write a blog post
so I'll show you the nitty gritty.

If we remove all the common words from the set of all words,
then it follows that we are left with only the uncommon ones.
An easy source for the set of all words is /usr/share/dict/words,
which is just a pre-installed file with newline-separated words.
I say easy because everyone already has a copy and because it's
in a nice, parseable format. Note, however, that it isn't
necessarily a good dictionary: there are ~20000 words compared
to the [Oxford English Dictionary](http://www.oed.com/)'s  ~600000. But I think
it's a worthwhile tradeoff to not having to scrape the OED.
What about the set of common words? Well, we can scrape some
text from the web, and, if we find a word that's being used,
we can consider it common enough to throw away. Let's begin!

It turns out that we don't need to scrape anything. Data dumps
of all of Wikipedia's articles are readily available, so let's
grab the latest one from the [Simple Wikipedia data dump](http://dumps.wikimedia.org/simplewiki/latest/). Why
Simple Wikipedia? The Simple English Wikipedia dump is 473 MB
uncompressed, which when compared to the regular English
Wikipedia's 44 GB uncompressed and considering the amount of
parsing and checking we are going to have to do suddenly seems
very reasonable. It also should contain very commonly-used words. Anyways:

`wget http://dumps.wikimedia.org/simplewiki/latest/simplewiki-latest-pages-articles.xml.bz2`

`bzip2 simplewiki-latest-pages-articles.xml.bz2`

Let's take a look at the structure of the data:
{% highlight xml %}
<mediawiki xmlns="http://www.mediawiki.org/xml/export-0.9/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.mediawiki.org/xml/export-0.9/ http://www.mediawiki.org/xml/export-0.9.xsd" version="0.9" xml:lang="en">
  <siteinfo>
    ...
  </siteinfo>
    <page>
    <title>April</title>
    <ns>0</ns>
    <id>1</id>
    <revision>
      <id>4784983</id>
      <parentid>4657771</parentid>
      <timestamp>2014-04-18T02:15:54Z</timestamp>
      <contributor>
        <ip>61.199.127.79</ip>
      </contributor>
      <comment>made the grammar better</comment>
      <text xml:space="preserve">{{monththisyear|4}}
'''April''' is the fourth [[month]] of the [[year]], and comes between [[March]] and [[May]]. It has 30 [[day]]s. April begins on the same day of week as [[July]] in all years and also [[January]] in leap years.
...
{{Months}}</text>
      <sha1>jk9e5is1yxp1resnscpooes74s5fnc1</sha1>
      <model>wikitext</model>
      <format>text/x-wiki</format>
    </revision>
  </page>
{% endhighlight %}

So all the data is in the `<text>` tag under `<revision>` in each
`<page>`. We can use `xsltproc` to parse the XML using the following stylesheet:

{% highlight xml %}
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output method="text"/>
  <xsl:template match="mediawiki">
    <xsl:for-each select="page/revision">
      <xsl:value-of select="text"/>
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>
{% endhighlight %}

Save the stylesheet as `stylesheet.xsl` and run
`xsltproc stylesheet.xsl simplewiki-latest-pages-articles.xml > wiki-raw-text`.
You can take a look at the output with `less wiki-raw-text`. It looks like
there's still some scrubbing to do: we have to remove whitespace and other
non-alphabetic characters and put each word in its own line so we can parse
it the same way as /usr/share/dict/words. Let's break out some good old UNIX tools.

First, we replace all non-alphabetic characters with spaces: 

`tr -c "[:alpha:]" " " < wiki-raw-text > wiki-alpha-text`

Next, slam everything down to lowercase (oh yeah, do this for /words too): 

`tr '[:upper:]' '[:lower:]' < wiki-alpha-text > wiki-lower-text`

Finally, we can use sed to strip all whitespace and replace it with a newline,
piping the result to sort and then uniq to only get unique words: 

`sed -e "s/[[:space:]] */\n/g" wiki-lower-text | sort | uniq > wiki-parsed-text`

(If you are on OS X, you will have to download `gnu-sed` using `brew install
gnu-sed` for sed to read the newline character.)

Now we've got a complete set of words and a set of common words. The running
time for removing the common words from the complete set naively can get as
bad as O(m * n) where m and n are the sizes of the sets. We can do a lot
better using a [Trie](http://en.wikipedia.org/wiki/Trie), which is a super hip data structure optimized for looking up and deleting
strings. Looking up a word in a trie is only O(len(word)), which doesn't vary
too widely, so removing a set M from the complete set should only take O(M)
(after inserting all words, of course). Here's my Python implementation of a Trie:

{% highlight python3 linenos %}
class Trie:
    def __init__(self):
        self._trie = {"word": ""}

    def insert(self, x):
        trie = self._trie

        for index, char in enumerate(x):
            if char not in trie:
                trie[char] = {}
            trie = trie[char]
            if index == (len(x) - 1) :
                trie["word?"] = True
        return None

    def delete(self, x):
        trie = self._trie
        try:
            for index, char in enumerate(x):
                trie = trie[char]
                if index == (len(x) - 1):
                    trie["word?"] = False
        except KeyError:
            return False
        return None

    def get_all_strings(self):
        trie = self._trie
        queue = [trie]
        lst = []
        while queue:
            d = queue[0]
            current_word = d["word"]
            if d.get("word?"):
                lst.append(current_word)
            d.pop("word?", None)
            d.pop("word")

            keys = list(d.keys())
            for key in keys:
                d[key]["word"] = current_word + key
                queue.append(d[key])
            queue.pop(0)
        return lst
{% endhighlight %}

And my Python script that adds all the words to the trie, removes the
ones we've parsed, and prints out the remaining ones:

{% highlight python3 linenos %}
from trie import Trie
dicttrie = Trie()

with open("dict-parsed") as dictfile, open("wiki-parsed-text") as wikifile:
    for line in dictfile:
        word = line.rstrip("\n")
        dicttrie.insert(word)
    for line in wikifile:
        word = line.rstrip("\n")
        dicttrie.delete(word)
    for word in dicttrie.get_all_strings():
        print(word)
{% endhighlight %}

Now:

`python3 words.py > uncommon-words`

And there you have it. uncommon-words now contains the most uncommon words in the dictionary, such as

+ joskin
+ kendir
+ glazily
+ rubelet
+ suiform
+ bursicle

Cool beans.

Edit: My friend Jay pointed out that using the built-in set type was much faster than
using a trie:
{% highlight python3 linenos %}
with open("dict-parsed") as dictfile, open("wiki-parsed-text") as wikifile:
    all_words = set()
    for line in dictfile:
        word = line.rstrip("\n")
        all_words.add(word)
    common_words = set()
    for line in wikifile:
        word = line.rstrip("\n")
        common_words.add(word)
    print(all_words - common_words)
{% endhighlight %}
takes about 1.5 seconds versus my trie-based implementation, which took 37 seconds.
But that is lame and boring and I implemented a really cool data structure for a real-world application so who's really the winner here Jay?

It's me. I am the winner.

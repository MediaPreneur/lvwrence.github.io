---
layout: post
title: Finding the edit distance between two strings
---
The edit distance between two strings refers to the minimum number of character
insertions, deletions, and substitutions required to change one string to the
other. For example, the edit distance between "kitten" and "sitting" is three:
substitute the "k" for "s", substitute the "e" for "i", and append a "g". Our
particular metric, which allows insertions, deletions, and substitutions is
called the Levenshtein distance (other variants exist, such as the LCS (longest
common subsequence) distance, which disallows substitution). Edit distance is
useful for measuring similarity between strings. Superficial similarity is
implied here, as in: the content and meaning of the words don't matter; for
semantic similarity, look at [Jaccard's similarity coefficient](http://www.iaeng.org/publication/IMECS2013/IMECS2013_pp380-384.pdf).
Let's implement the Wagner-Fischer algorithm, which computes the edit distance
between two strings.

The key insight required to understand this algorithm is -- as usual -- recursive.
Notice that if we have the edit distance d between two strings minus the first
character, then the actual edit distance will be d + 1 only if the first characters
of both strings are not the same. Take the words "jewels" and "mogwai": assuming
we have the edit distance between "ewels" and "ogwai" (5), then the actual distance
will be 6, since "j" and "m" are different. We can simply apply this rule until
we hit the end of one (or both) of the strings. Then the edit distance will just
be the length of the remaining string, as we just can add the requisite characters.
The astute reader will notice that there is a mistake in our analysis, however:
we've only covered the substitution rule. Evaluating "godspeed" and "speed" using
this rule would result in an edit distance of 8, which is clearly wrong, since
we should be able to do it in 3 moves by deleting "god" from "godspeed". We can
support suffix alignment by computing our first rule, then the edit distance
between each string and the last n-1 characters of the other plus one, and then
taking the minimum between all of these computations. This essentially ends up
trying each path to see whether we can find a common fragment in both strings
that isn't necessarily aligned.

Here's my implementation of our rule in Python:

{% highlight python3 linenos %}
def levenshtein(s1, s2):
    if len(s1) == 0 or len(s2) == 0:
        return max(len(s1), len(s2))

    return min(levenshtein(s1[1:], s2) + 1,
               levenshtein(s1, s2[1:]) + 1,
               levenshtein(s1[1:], s2[1:]) if s1[0] == s2[0] else
               levenshtein(s1[1:], s2[1:]) + 1)
{% endhighlight %}

However, this is really inefficient because of all the repeated subcomputations.
Running this on the first two sentences of lorem ipsum doesn't even terminate
in a reasonable amount of time. We can memoize, essentially caching our
subcomputations, which is a top-down dynamic programming strategy:

{% highlight python3 linenos %}
memo = {}
def levenshtein(s1, s2):
    if len(s1) == 0 or len(s2) == 0:
        return max(len(s1), len(s2))

    if (s1, s2) not in memo:
        memo[(s1, s2)] = min(levenshtein(s1[1:], s2) + 1,
                levenshtein(s1, s2[1:]) + 1,
                levenshtein(s1[1:], s2[1:]) if s1[0] == s2[0] else levenshtein(s1[1:], s2[1:]) + 1)

    return memo[(s1, s2)]
{% endhighlight %}

But that's easy and boring. Plus, there's still a lot of memory overhead from
the stack frames generated from all the recursion. Let's take a bottom-up approach
to the problem instead. The actual Wagner-Fischer algorithm uses a two-dimensional
array (or matrix) to hold the edit distances between prefixes of each string.
The array (let's call it A) has size m by n, where m and n are one plus the
lengths of the first and second strings s1 and s2, respectively. What is stored
at each index i, j is the edit distance between s1[:i] and s2[:j]. Then, from
our work above, we have the following relation:

$$
A[i, j] =
\cases{
i  & \text{if } j = 0\cr
j & \text{if } ji= 0\cr
A[i - 1, j - 1] & \text{if } s1[i] = s2[j]\cr
min(A[i-1, j], A[i, j-1], A[i - 1, j - 1]) + 1 & \text{if } s1[i] \neq s2[j]
}
$$


Notice that the recursive part of the relation depends on the values directly above,
left, and upper left. This means we have to fill in the matrix in a certain order.
My solution works like this:

{% highlight python3 linenos %}
def levenshtein(s1, s2):
    x = len(s1) + 1 # the length of the x-coordinate
    y = len(s2) + 1 # the length of the y-coordinate

    A = [[-1 for i in range(x)] for j in range(y)]
    for i in range(x):
        A[0][i] = i

    for j in range(y):
        A[j][0] = j

    for i in range(1, y):
        for j in range(1, x):
            if s1[j- 1] == s2[i - 1]:
                A[i][j] = A[i - 1][j - 1]
            else:
                A[i][j] = min(
                        A[i - 1][j] + 1,
                        A[i][j - 1] + 1,
                        A[i - 1][j - 1] + 1
                        )
    return A[y - 1][x - 1] # return the edit distance between the two strings
{% endhighlight %}

And now you know how to compute the Levenshtein distance! As an exercise, try
reconstructing the actual transformations to go from s1 to s2.

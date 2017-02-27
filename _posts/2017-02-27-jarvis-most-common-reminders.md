---
layout: post
title: Jarvis' 100 most asked reminders
---
Well, it's midterm season, which means I'm doing anything except studying for my compilers test tomorrow.
I thought it would be interesting to go through all the reminders [Jarvis](http://hellojarvis.io/) has received and find the most
commonly asked reminders. Thanks to our very liberal [privacy policy](http://hellojarvis.io/privacy/),
I used [Heroku Dataclips](https://devcenter.heroku.com/articles/dataclips) to download a JSON-formatted
list of reminders, and then used this short script to count the 100 most common reminders:

{% highlight python3 linenos %}
from collections import Counter
import json

with open('reminders.json') as reminders_file:
    data = json.load(reminders_file)
    reminders = data['values']

c = Counter()
for reminder in reminders:
    reminder_id, user_id, message, timestamp, completed = reminder
    c[message] += 1

print(c.most_common(100))
{% endhighlight %}

Here are the results:

<table id="most-common-reminders">
	<tr>
		<th>Reminder</th>
		<th>Count</th>
		<th>Percentage</th>
	</tr>
	<tr><td>to wake up</td><td>1349</td><td>1.779%</td></tr>
	<tr><td>to sleep</td><td>463</td><td>0.611%</td></tr>
	<tr><td>to eat</td><td>350</td><td>0.462%</td></tr>
	<tr><td>Yes</td><td>289</td><td>0.381%</td></tr>
	<tr><td>to study</td><td>269</td><td>0.355%</td></tr>
	<tr><td>to get up</td><td>222</td><td>0.293%</td></tr>
	<tr><td>to go home</td><td>219</td><td>0.289%</td></tr>
	<tr><td>to get coffee</td><td>211</td><td>0.278%</td></tr>
	<tr><td>to go to work</td><td>189</td><td>0.249%</td></tr>
	<tr><td>to call mom</td><td>187</td><td>0.247%</td></tr>
	<tr><td>to drink water</td><td>183</td><td>0.241%</td></tr>
	<tr><td>to go to the gym</td><td>165</td><td>0.218%</td></tr>
	<tr><td>yes</td><td>159</td><td>0.210%</td></tr>
	<tr><td>to go to school</td><td>144</td><td>0.190%</td></tr>
	<tr><td>remind you</td><td>140</td><td>0.185%</td></tr>
	<tr><td>to do your homework</td><td>139</td><td>0.183%</td></tr>
	<tr><td>to take out the trash</td><td>133</td><td>0.175%</td></tr>
	<tr><td>to go to sleep</td><td>131</td><td>0.173%</td></tr>
	<tr><td>to leave</td><td>120</td><td>0.158%</td></tr>
	<tr><td>to walk the dog</td><td>119</td><td>0.157%</td></tr>
	<tr><td>to go to bed</td><td>113</td><td>0.149%</td></tr>
	<tr><td>meeting</td><td>109</td><td>0.144%</td></tr>
	<tr><td>to shave</td><td>104</td><td>0.137%</td></tr>
	<tr><td>to work</td><td>103</td><td>0.136%</td></tr>
	<tr><td>to do your best</td><td>89</td><td>0.117%</td></tr>
	<tr><td>to do homework</td><td>89</td><td>0.117%</td></tr>
	<tr><td>Remind me</td><td>79</td><td>0.104%</td></tr>
	<tr><td>to pay your rent</td><td>78</td><td>0.103%</td></tr>
	<tr><td>to fuck you</td><td>77</td><td>0.102%</td></tr>
	<tr><td>Remind</td><td>76</td><td>0.100%</td></tr>
	<tr><td>to call</td><td>73</td><td>0.096%</td></tr>
	<tr><td>to go for a run</td><td>70</td><td>0.092%</td></tr>
	<tr><td>No</td><td>70</td><td>0.092%</td></tr>
	<tr><td>to pay rent</td><td>68</td><td>0.090%</td></tr>
	<tr><td>to kill myself</td><td>67</td><td>0.088%</td></tr>
	<tr><td>to go out</td><td>67</td><td>0.088%</td></tr>
	<tr><td>to call your mom</td><td>66</td><td>0.087%</td></tr>
	<tr><td>to take a shower</td><td>64</td><td>0.084%</td></tr>
	<tr><td>to buy milk</td><td>63</td><td>0.083%</td></tr>
	<tr><td>to buy toilet paper</td><td>62</td><td>0.082%</td></tr>
	<tr><td>to eat lunch</td><td>61</td><td>0.080%</td></tr>
	<tr><td>to take a bath</td><td>60</td><td>0.079%</td></tr>
	<tr><td>to do something</td><td>59</td><td>0.078%</td></tr>
	<tr><td>to take your medicine</td><td>58</td><td>0.076%</td></tr>
	<tr><td>wake up</td><td>58</td><td>0.076%</td></tr>
	<tr><td>to do laundry</td><td>56</td><td>0.074%</td></tr>
	<tr><td>to go to gym</td><td>55</td><td>0.073%</td></tr>
	<tr><td>to go</td><td>52</td><td>0.069%</td></tr>
	<tr><td>to kill you</td><td>52</td><td>0.069%</td></tr>
	<tr><td>to have lunch</td><td>52</td><td>0.069%</td></tr>
	<tr><td>to go to meeting</td><td>51</td><td>0.067%</td></tr>
	<tr><td>to say hi</td><td>50</td><td>0.066%</td></tr>
	<tr><td>to pick up laundry</td><td>50</td><td>0.066%</td></tr>
	<tr><td>to leave work</td><td>50</td><td>0.066%</td></tr>
	<tr><td>to check metrics</td><td>50</td><td>0.066%</td></tr>
	<tr><td>to brush your teeth</td><td>49</td><td>0.065%</td></tr>
	<tr><td>to call dad</td><td>46</td><td>0.061%</td></tr>
	<tr><td>to read</td><td>46</td><td>0.061%</td></tr>
	<tr><td>to fuck</td><td>46</td><td>0.061%</td></tr>
	<tr><td>to die</td><td>45</td><td>0.059%</td></tr>
	<tr><td>to exercise</td><td>44</td><td>0.058%</td></tr>
	<tr><td>to run</td><td>42</td><td>0.055%</td></tr>
	<tr><td>to shower</td><td>42</td><td>0.055%</td></tr>
	<tr><td>to pray</td><td>42</td><td>0.055%</td></tr>
	<tr><td>to workout</td><td>41</td><td>0.054%</td></tr>
	<tr><td>to pour tea</td><td>41</td><td>0.054%</td></tr>
	<tr><td>to take medicine</td><td>41</td><td>0.054%</td></tr>
	<tr><td>to poop</td><td>41</td><td>0.054%</td></tr>
	<tr><td>to say hello</td><td>41</td><td>0.054%</td></tr>
	<tr><td>Nothing</td><td>41</td><td>0.054%</td></tr>
	<tr><td>to eat dinner</td><td>40</td><td>0.053%</td></tr>
	<tr><td>to wake you up</td><td>40</td><td>0.053%</td></tr>
	<tr><td>to go to the bank</td><td>39</td><td>0.051%</td></tr>
	<tr><td>to call Mom</td><td>38</td><td>0.050%</td></tr>
	<tr><td>to go to</td><td>37</td><td>0.049%</td></tr>
	<tr><td>to test</td><td>37</td><td>0.049%</td></tr>
	<tr><td>to get ready</td><td>36</td><td>0.047%</td></tr>
	<tr><td>to leave the office</td><td>36</td><td>0.047%</td></tr>
	<tr><td>to take a break</td><td>35</td><td>0.046%</td></tr>
	<tr><td>to have sex</td><td>35</td><td>0.046%</td></tr>
	<tr><td>to work out</td><td>35</td><td>0.046%</td></tr>
	<tr><td>to go to the team meeting</td><td>35</td><td>0.046%</td></tr>
	<tr><td>to go to class</td><td>34</td><td>0.045%</td></tr>
	<tr><td>appointment</td><td>34</td><td>0.045%</td></tr>
	<tr><td>to take your pill</td><td>33</td><td>0.044%</td></tr>
	<tr><td>to pee</td><td>33</td><td>0.044%</td></tr>
	<tr><td>to go to the dentist</td><td>33</td><td>0.044%</td></tr>
	<tr><td>to wakeup</td><td>33</td><td>0.044%</td></tr>
	<tr><td>to return the library book</td><td>33</td><td>0.044%</td></tr>
	<tr><td>to go to leave work early</td><td>32</td><td>0.042%</td></tr>
	<tr><td>to send email</td><td>32</td><td>0.042%</td></tr>
	<tr><td>to have dinner</td><td>31</td><td>0.041%</td></tr>
	<tr><td>to call mum</td><td>31</td><td>0.041%</td></tr>
	<tr><td>to check</td><td>30</td><td>0.040%</td></tr>
	<tr><td>to drink coffee</td><td>30</td><td>0.040%</td></tr>
	<tr><td>to watch tv</td><td>30</td><td>0.040%</td></tr>
	<tr><td>to fill out your visa forms</td><td>30</td><td>0.040%</td></tr>
	<tr><td>to hand in math assignment</td><td>30</td><td>0.040%</td></tr>
	<tr><td>to masturbate</td><td>29</td><td>0.038%</td></tr>
	<tr><td>to go to the DMV</td><td>29</td><td>0.038%</td></tr>
</table>

If you found Jarvis useful, don't forget to [donate](http://hellojarvis.io/)!

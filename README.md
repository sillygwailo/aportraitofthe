A Portrait of the **** as a Young ****
==========

Requires [node](http://nodejs.org/) and [npm](http://npmjs.org/). You also need a Twitter App access token, consumer key, and associated secrets: https://dev.twitter.com/apps/new

Finally, you need a Wordnik API key, which you can apply for here: http://developer.wordnik.com/

Before running the program:

1. Add all the Twitter info to twitter.js
2. Add the Wordnik API key to wordnik.js
3. Install the following Node modules:
  * npm install wordnik@0.0.2
  * npm install twit@1.1.6
  * npm install express@2.5.9
4. node aportraitofthe.js

Consider running the bot in the background with [forever](https://github.com/nodejitsu/forever) or [pm2](https://github.com/Unitech/pm2).
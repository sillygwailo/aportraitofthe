var wordnikAPIkey = require(__dirname + '/wordnik_api_key.js');

var Wordnik = require('wordnik');

var Twit = require('twit');

var T = new Twit(require(__dirname + '/twitter.js'));

var statement = "";

// Capitalize the word http://stackoverflow.com/a/17752917/300278
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function makePortrait() {
  statement = "";

  var w = new Wordnik({
    api_key: wordnikAPIkey
  });

  var randomOptions = {
    minDictionaryCount: 20,
    includePartOfSpeech: 'noun',
    excludePartOfSpeech: "proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix",
    hasDictionaryDef: true,
    maxLength: 12,
    minCorpusCount: 10000,
    limit: '2',
  }

  console.log(statement);
  w.randomWords(randomOptions, function(err, words) {
    statement = "A Portrait of the " + capitalize(words[0].word) + " As a Young " + capitalize(words[1].word);
    T.post('statuses/update', { status: statement}, function(err, reply) {
      console.log("error: " + err);
      console.log("reply: " + reply);
    });
  });
}

function favRTs () {
  T.get('statuses/retweets_of_me', {}, function (e,r) {
    for(var i=0;i<r.length;i++) {
      T.post('favorites/create/'+r[i].id_str,{},function(){});
    }
    console.log('harvested some RTs'); 
  });
}

// every hour, make and tweet a portrait wrapped in a try/catch
// in case Twitter is unresponsive, don't really care about error
// handling. it just won't tweet.
setInterval(function() {
  try {
    makePortrait();
  }
 catch (e) {
    console.log(e);
  }
}, 2700000 + Math.floor(Math.random() * 1800000));

// every 5 hours, check for people who have RTed a portrait, and favorite that portrait
setInterval(function() {
  try {
    favRTs();
  }
 catch (e) {
    console.log(e);
  }
},60000*60*5);

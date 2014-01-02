var restclient = require('node-restclient');
var Twit = require('twit');

var T = new Twit(require(__dirname + '/config.js'));

var statement = "";

// insert your Wordnik API info below
var wordnikAPIkey = require(__dirname + '/wordnik.js');
var getNounsURL = "http://api.wordnik.com/v4/words.json/randomWords?" +
                  "minCorpusCount=10000&minDictionaryCount=20&" +
                  "excludePartOfSpeech=proper-noun,proper-noun-plural,proper-noun-posessive,suffix,family-name,idiom,affix&" +
                  "hasDictionaryDef=true&includePartOfSpeech=noun&limit=2&maxLength=12&" +
                  "api_key=" + wordnikAPIkey;

// Capitalize the word http://stackoverflow.com/a/17752917/300278
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function makePortrait() {
  statement = "";
  restclient.get(getNounsURL,
  function(data) {

    statement += "A Portrait of the " + capitalize(data[0].word) + " as a Young " + capitalize(data[1].word);

    console.log(statement);
    T.post('statuses/update', { status: statement}, function(err, reply) {
      console.log("error: " + err);
      console.log("reply: " + reply);
    });
  }
  ,"json");
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
},3600000);

// every 5 hours, check for people who have RTed a portrait, and favorite that portrait
setInterval(function() {
  try {
    favRTs();
  }
 catch (e) {
    console.log(e);
  }
},60000*60*5);

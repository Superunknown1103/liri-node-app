// Importing Twitter API keys
var birdKeys = require('./keys.js');
var fs = require('fs');
var twitter = require('twitter');
// var spotify = require('spotify');
// var request = require('request');

console.log("\nINSTRUCTIONS:\n Enter one of the following commands: \n\n USER'S LAST 20 TWEETS: node liri.js my-tweets 'twitter handle'\n SONG INFO: node liri.js spotify-this-song 'song name'\n MOVIE INFO: node liri.js movie-this 'movie name'\n RUN A COMMAND FROM A TEXT FILE: node liri.js do-what-it-says\n");

var writeToLog = function(data) {
	fs.appendFile("log.txt", '\r\n\r\n');

	fs.appendFile("log.txt", JSON.stringify(data), function(err) {
		if (err) {
			return console.log(err);
		}
		console.log("log.txt was updated!");
	});
};

var getTweets = function() {

var client = new twitter({
 consumer_key: 'wGMO9j0cVb2c8Ss6reQW8geQW',
  consumer_secret: 'd0L6QamRlISCC5U3JZWXo3yiMwtxTwGu4SW9zDiljAl0WYeDTy',
  access_token_key: '886890483225686018-jhynufuTNpkdwI3rlO7DQJl9Z2gNHQO',
  access_token_secret: '3vZC3Lhvv1r7B6kHEZesxjZjQUT1rcf34Xku20pfYKIxP',
});
   var params = { screen_name: 'BrucesLiriBot', count: 5 };

   client.get('statuses/user_timeline', params, function(error, tweets, response) {

       if (!error) {
           var data = []; //empty array

           for (var i = 0; i < tweets.length; i++) {
               data.push({
  				// had to remove created_at due to errors with tweets being written in the same minute //
                   'Tweets: ' : tweets[i].text,
               });
           };
};
      console.log(data);
      writeToLog(data);
  	});
  };


var pick = function(caseData, functionData) {
	switch (caseData) {
		case 'my-tweets':
		getTweets();
		break;
	default:
	console.log('LIRI doesn\'t know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

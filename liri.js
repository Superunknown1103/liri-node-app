// Importing Twitter API keys
var birdKeys = require('./keys.js');
var fs = require('fs');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

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
 
var searchSpotify = function(songName) {
        var spotify = new Spotify({
        id: 'e9c3df3e5d2b42c78016c53c9c93e01a',
        secret: '764134bf544444fb8bf178b3e7dff1e9'
        });
      
        const getArtistNames = function(artist){
            return artist.name;
        };
        const songname = process.argv[3];
        spotify.search({ type: 'track', query: songname , limit: 5 }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songs = data.tracks.items;
        var data = []; //empty array to hold data
        for (var i = 0; i < songs.length; i++) {
            data.push({
                'artist(s)': songs[i].artists.map(getArtistNames),
                'song name: ': songs[i].name,
                'preview song: ': songs[i].preview_url,
                'album: ': songs[i].album.name,
             });
        }
        console.log(data); 
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


var getMeMovie = function(movieName){

  if (movieName === undefined) {
    movieName = 'Mr Nobody';
  }

  var urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";
  console.log(urlHit);

  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = [];
      var jsonData = JSON.parse(body);

      data.push({
      'Title: ' : jsonData.Title,
      'Year: ' : jsonData.Year,
      'Rated: ' : jsonData.Rated,
      'IMDB Rating: ' : jsonData.imdbRating,
      'Country: ' : jsonData.Country,
      'Language: ' : jsonData.Language,
      'Plot: ' : jsonData.Plot,
      'Actors: ' : jsonData.Actors,
      'Rotten Tomatoes Rating: ' : jsonData.tomatoRating,
      'Rotton Tomatoes URL: ' : jsonData.tomatoURL,
  });
      console.log(data)
      writeToLog(data);
}
  });
}

var pick = function(caseData, functionData) {
	switch (caseData) {
		case 'my-tweets':
		getTweets();
		break;
		case 'spotify-this-song':
      	searchSpotify();
      	break;
      	case 'movie-this':
        getMeMovie(functionData);
        break;

	default:
	console.log('LIRI doesn\'t know that');
	}
}

var runThis = function(argOne, argTwo) {
	pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);

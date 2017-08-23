//Get all npm package variables
var fs = require("fs");
var request = require("request");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

//Set Env Variables
var SPOTIFY_ID=process.env.SPOTIFY_ID;
var SPOTIFY_SECRET=process.env.SPOTIFY_SECRET
var OMDB_API_KEY=process.env.OMDB_API_KEY
var TWITTER_CONSUMER_KEY=process.env.TWITTER_CONSUMER_KEY
var TWITTER_CONSUMER_SECRET=process.env.TWITTER_CONSUMER_SECRET
var TWITTER_ACCESS_TOKEN_KEY=process.env.TWITTER_ACCESS_TOKEN_KEY
var TWITTER_ACCESS_TOKEN_SECRET=process.env.TWITTER_ACCESS_TOKEN_SECRET

//Console log them to ensure they are
console.log(SPOTIFY_ID + SPOTIFY_SECRET +  OMDB_API_KEY +  TWITTER_CONSUMER_KEY + TWITTER_CONSUMER_SECRET + TWITTER_ACCESS_TOKEN_KEY + TWITTER_ACCESS_TOKEN_SECRET)

//Set input
var input = process.argv[3];
var command = process.argv[2];


//Set npm variables
var client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

var spotify = new Spotify({
  id: SPOTIFY_ID,
  secret: SPOTIFY_SECRET
});

//Functions

//Get Tweets
var getMyTweets = () => {
	var params = {screen_name: 'okapoor3'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	console.log("====== Tweets =========")
	    for (var i = 0;i<20;i++) {
	    	console.log("======================= Tweet : " + i + "=======================")
	    	console.log("Created at : " + tweets[i].created_at + " ");
	    	console.log("Tweet Text : " + tweets[i].text + " ");
	    	// console.log("==============================================")
	    }
	  }
	});
}


//Search Spotify
var searchSpotify = () => {
	var song = input || "The Sign"
	spotify.search({ type: 'track', query: song }, function(err, data) {
	  if (err) {
	    return console.log('Error occurred: ' + err);
	  }
	console.log("****************************************")
	console.log("===== Artist : " + data.tracks.items[0].artists[0].name + " ====");
	console.log("===== Track : " + data.tracks.items[0].name + " ====");
	console.log("===== Album : " + data.tracks.items[0].album.name + " ====");
	console.log("===== URL Preview : " + data.tracks.items[0].external_urls.spotify + " ====");
	console.log("****************************************")
	});
}

//Search OMDB
var omdbSearch = () => {
	var movie = input.split(" ").join("+") || "Mr.+Nobody"
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+movie, function (error, response, body) {
	  if(error) {
	  	return 
	  }
	  // console.log(response);
	  console.log("****************************************");
	  // console.log(body)
 // * Title of the movie.
 //   * Year the movie came out.
 //   * IMDB Rating of the movie.
 //   * Rotten Tomatoes Rating of the movie.
 //   * Country where the movie was produced.
 //   * Language of the movie.
 //   * Plot of the movie.
 //   * Actors in the movie.
 	var bodyJson = JSON.parse(body);
 	console.log("****************************************");
 	console.log("Movie Title : " + bodyJson.Title);
   	console.log("IMDB Rating : " + bodyJson.Ratings[0].Value);
 	console.log("Rotten Tomatoes Rating: " + bodyJson.Ratings[1].Value);
 	console.log("Country Produced : " + bodyJson.Country);
 	console.log("Language : " + bodyJson.Language);
 	console.log("Plot : " + bodyJson.Plot);
 	console.log("Actors : " + bodyJson.Actors);
 	console.log("****************************************");


	});
}



//Read file and do what it says
function dowhatItSays () {
	fs.readFile("random.txt", "utf8", (err, data) => {
		var dataArr = data.split(" ")
		command = dataArr[0];
		input = dataArr[1]
		doStuff();
	})


}



// Do something with input

function doStuff () {
	switch(command) {
		case "my-tweets":
			getMyTweets();
		break;

		case "spotify-this-song":
			searchSpotify();
		break;

		case "movie-this":
		omdbSearch();
		break;

		case "do-what-it-says":
		dowhatItSays();
		break;

		default:
		console.log("Invalid Input");
	}
}

doStuff();





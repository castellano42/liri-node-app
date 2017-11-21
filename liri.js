var keys = require('./keys.js');
var twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var querystring = require("querystring");


function getTwitterPosts() {
	var client = new twitter({
	  consumer_key: 'YFjKRLwVqoXHJ0JUPNCzZ6CX7',
	  consumer_secret: 'GmAcYLTUS8plA2qc5hPDWqBNPLLsjLNFEQDOBmVHO4vIy9S7K4',
	  access_token_key: '931285223882420224-PgK4UDGY5aIgx3G2xyA9iqBMvhzM8Df',
	  access_token_secret: 'iZNE8mZjn2jraZDkfGq2oLDJGnlmxvOc0jHeAgD3b5nbW'
	});

	var params = {screen_name: 'JoeySaladboy1'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for(var i = 0; i < 20; i++){
	    console.log(tweets[i].text);
		}
	  }
	});
}

function getSpotifyData(searchQuery){
	var spotify = new Spotify({
	  id: "1b43c1a4715f44eeb896a3e1bb1da0c5",
	  secret: "d6f9ef1a61714082b0509455a4789f6f"
	});
	 
	spotify.search({ type: 'track', query: searchQuery}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		var firstItem = data.tracks.items[0]
		var albumRoot = firstItem.album.artists[0]; 
		var artistsRoot = firstItem.artists[0];

		var albumUrl = albumRoot.external_urls.spotify; 
		var songUrl = firstItem.external_urls.spotify; 
		var artistName = albumRoot.name; 
		var songName = firstItem.name; 

		console.log("Artist Name : ", artistName);
		console.log("Song Name : ", songName);
		console.log("Albume URL : ", albumUrl);
		console.log("Song URL : ", songUrl);
	});
}

       // * Title of the movie.
       // * Year the movie came out.
       // * IMDB Rating of the movie.
       // * Rotten Tomatoes Rating of the movie.
       // * Country where the movie was produced.
       // * Language of the movie.
       // * Plot of the movie.
       // * Actors in the movie.
function getMovieInfo(movieTitle){
	searchParam = querystring.stringify({
		t:movieTitle, 
		y:"",
		plot:"short",
		apikey:"trilogy"
	});
	console.log(searchParam);
	// Then run a request to the OMDB API with the movie specified
	request("http://www.omdbapi.com/?"+searchParam, function(error, response, body) {
		// If the request is successful (i.e. if the response status code is 200)
		if (!error && response.statusCode === 200) {
			// Parse the body of the site and recover just the imdbRating
			// (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
			var parsedBody = JSON.parse(body);
			var rottenTomatoesRating = getRottenTomatoesRating(parsedBody.Ratings);
			console.log("The movie's rating is: " + parsedBody.Title);
			console.log("The movie's rating is: " + parsedBody.Year);
			console.log("The movie's rating is: " + parsedBody.Country);
			console.log("The movie's rating is: " + rottenTomatoesRating);
			console.log("The movie's rating is: " + parsedBody.Language);
			console.log("The movie's rating is: " + parsedBody.Plot);
			console.log("The movie's rating is: " + parsedBody.Actors);
		} else{
			console.log("there was an ERROR!!!!!!!!!!!!!!!!!!!! "+error);
		}
	});
}

function getRottenTomatoesRating(ratings){
	for(var i=0; i < ratings.length; i++){
		var rating = ratings[i]
		if(rating.Source == "Rotten Tomatoes"){
			return rating.Value
		}
	}
}


var commandName = process.argv[2];
var commandValue = process.argv.splice(3, process.argv.length - 3).join(" ");
switch(commandName){
	case "movie-this":
		getMovieInfo(commandValue);
		break; 
	case "spotify-this-song":
		getSpotifyData(commandValue);
		break;
	case "my-tweets":
		getTwitterPosts();
		break;
}

// getSpotifyData('Freak On a Leash');
var keys = require('./keys.js');
var twitter = require('twitter');
 
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


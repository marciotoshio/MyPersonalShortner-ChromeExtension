var twitterSettings = {
	'request_url': 'http://api.twitter.com/oauth/request_token',
	'authorize_url': 'https://api.twitter.com/oauth/authorize',
	'access_url': 'https://api.twitter.com/oauth/access_token',
	'consumer_key': 'anonymous',
	'consumer_secret': 'anonymous',
	'scope': 'http://api.twitter.com/1/statuses/update.json',
	'app_name': 'My Personal Shortner'
};

var twitter = {
	init: function() {
		return ChromeExOAuth.initBackgroundPage(twitterSettings);
	},
	
	isLoggedOn: function(oauth) {
		return oauth.hasToken();
	},
	
	logOut: function(oauth) {
		oauth.clearTokens();
	}
};
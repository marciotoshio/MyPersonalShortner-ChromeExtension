var oauth = ChromeExOAuth.initBackgroundPage({
	'request_url': 'https://api.twitter.com/oauth/request_token',
	'authorize_url': 'https://api.twitter.com/oauth/authorize',
	'access_url': 'https://api.twitter.com/oauth/access_token',
	'consumer_key': 'anonymous',
	'consumer_secret': 'anonymous',
	'scope': '',
	'app_name': 'My Personal Shortner'
});
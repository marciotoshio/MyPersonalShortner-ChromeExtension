var twitter = {
	isLoggedOn: function() {
		return common.bgPage().oauth.hasToken();
	},
	
	logOut: function() {
		common.bgPage().oauth.clearTokens();
	},
	
	authorize: function(callback) {
		common.bgPage().oauth.authorize(callback);
	},
	
	updateStatus: function(status, callback) {
		var url = 'http://api.twitter.com/1/statuses/update.json';
		var request = {
			'method': 'POST',
			'body': 'status=' + encodeURIComponent(status)
		};
		common.bgPage().oauth.sendSignedRequest(url, callback, request);
	}
};
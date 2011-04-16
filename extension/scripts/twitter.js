var twitter = {
	isLoggedOn: function() {
		return common.bgPage().shareAuth.hasToken();
	},
	
	logOut: function() {
		common.bgPage().shareAuth.clearTokens();
	},
	
	authorize: function(callback) {
		common.bgPage().shareAuth.authorize(callback);
	},
	
	getScreenName: function() {
		return common.bgPage().shareAuth.getScreenName();
	},
	
	updateStatus: function(status, callback) {
		//var url = 'https://api.twitter.com/1/statuses/update.json?status=' + status;
		//var method = 'POST';
		//var authHeader = {'key': 'Authorization', 'value': common.bgPage().shareauth.getAuthorizationHeader(url, method)};
		//var data = 'status=' + encodeURIComponent(status);
		//common.xhrRequest(url, 'POST', data, callback, authHeader);
		//common.bgPage().shareauth.sendSignedRequest(url, callback, request);
	}
};
var twitter = {
	isLoggedOn: function() {
		return common.bgPage().oauth.hasToken();
	},
	
	logOut: function() {
		common.bgPage().oauth.clearTokens();
	},
	
	authorize: function(callback) {
		common.bgPage().oauth.authorize(callback);
	}
	
	//updateStatus: function(status, callback) {
	//	var url = 'http://api.twitter.com/1/statuses/update.json';
	//	var method = 'POST';
	//	var params = {'status': status};
	//	common.bgPage().sendSignedRequest(url, callback, request);
	//}
};
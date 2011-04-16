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
	
	getToken: function() {
		return common.bgPage().shareAuth.getToken();
	},
	
	getTokenSecret: function() {
		return common.bgPage().shareAuth.getTokenSecret();
	},
	
	updateStatus: function(status, callback) {
		var url = localStorage['shortnerServiceDomain'] + localStorage['shortnerServiceTwitterUpdateStatusPath'];
		var method = 'POST';
		var data = 'token=' + encodeURIComponent(twitter.getToken()) + '&tokenSecret=' + encodeURIComponent(twitter.getTokenSecret()) + '&status=' + encodeURIComponent(status);
		common.xhrRequest(url, method, data, callback);
	}
};
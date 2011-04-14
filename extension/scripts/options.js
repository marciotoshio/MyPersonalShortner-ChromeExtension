var options = {
	init: function() {
		options.manageTwitterSections();
	},
	
	manageTwitterSections: function() {
		if(twitter.isLoggedOn())
		{
			document.getElementById('loggedOn').style.display = "block";
			document.getElementById('loggedOff').style.display = "none";
		}
		else
		{
			document.getElementById('loggedOn').style.display = "none";
			document.getElementById('loggedOff').style.display = "block";
		}
	},
	
	twitterSingIn: function() {
		twitter.authorize(options.twitterOnAuthorized);
	},
	
	twitterLogOut: function() {
		twitter.logOut();
		options.manageTwitterSections();
	},
	
	twitterOnAuthorized: function(token, secret) {
		options.manageTwitterSections();
	},
	
	save: function() {
		
	}
};
var options = {
	init: function() {
		options.manageTwitterSections();
	},
	
	manageTwitterSections: function() {
		var twitterOauth = twitter.init();
		if(twitter.isLoggedOn(twitterOauth))
		{
			document.getElementById('loggedOn').style.display = "block";
			document.getElementById('loggedOff').style.display = "none";
		}
		else
		{
			document.getElementById('loggedOn').style.display = "none";
			document.getElementById('loggedOff').style.display = "block";
		}
	}
};
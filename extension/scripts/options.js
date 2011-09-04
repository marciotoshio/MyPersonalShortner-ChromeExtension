var options = {
	init: function() {
		options.manageShortnerSection();
		options.manageTwitterSection();
	},
	/* Shortner */
	manageShortnerSection: function() {
		document.getElementById('serviceDomain').value = localStorage['shortnerServiceDomain'] || "";
	},
	/* /Shortner */
	
	/* Twitter */
	manageTwitterSection: function() {
		if(twitter.isLoggedOn())
		{
			document.getElementById('screenName').innerText = twitter.getScreenName();
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
		options.manageTwitterSection();
	},
	
	twitterOnAuthorized: function(token, secret) {
		options.manageTwitterSection();
	},
	/* /Twitter */
	save: function() {
		localStorage['shortnerServiceDomain'] = document.getElementById('serviceDomain').value;
		document.getElementById('saveMessage').innerText = "Saved!";
	}
};
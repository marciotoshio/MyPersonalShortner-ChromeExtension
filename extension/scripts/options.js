var options = {
	init: function() {
		options.manageShortnerSection();
		options.manageTwitterSection();
	},
	/* Shortner */
	manageShortnerSection: function() {
		document.getElementById('serviceUrl').value = localStorage['shortnerServiceUrl'] || "";
	},
	/* /Shortner */
	
	/* Twitter */
	manageTwitterSection: function() {
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
		options.manageTwitterSection();
	},
	
	twitterOnAuthorized: function(token, secret) {
		options.manageTwitterSection();
	},
	/* /Twitter */
	save: function() {
		localStorage['shortnerServiceUrl'] = document.getElementById('serviceUrl').value;
		document.getElementById('saveMessage').innerText = "Saved!";
	}
};
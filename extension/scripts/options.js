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
			document.getElementById('screenName').innerText = twitter.getScreenName();
			document.getElementById('loggedOn').style.display = "block";
			document.getElementById('loggedOff').style.display = "none";
		}
		else
		{
			document.getElementById('serviceUrlAuth').value = localStorage['shortnerServiceUrlAuth'] || "";
			document.getElementById('serviceUrlAuthPath').value = localStorage['shortnerServiceUrlAuthPath'] || "";
			document.getElementById('loggedOn').style.display = "none";
			document.getElementById('loggedOff').style.display = "block";
		}
	},
	
	twitterSingIn: function() {
		if(document.getElementById('serviceUrlAuth').value != '' && document.getElementById('serviceUrlAuthPath').value != '') {
			localStorage['shortnerServiceUrlAuth'] = document.getElementById('serviceUrlAuth').value;
			localStorage['shortnerServiceUrlAuthPath'] = document.getElementById('serviceUrlAuthPath').value;
			twitter.authorize(options.twitterOnAuthorized);
		}
		else {
			document.getElementById('twitterErrorMessage').innerText = "Twitter Service Urls are Required";
		}
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
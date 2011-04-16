var options = {
	init: function() {
		options.manageShortnerSection();
		options.manageTwitterSection();
	},
	/* Shortner */
	manageShortnerSection: function() {
		document.getElementById('serviceDomain').value = localStorage['shortnerServiceDomain'] || "";
		document.getElementById('servicePath').value = localStorage['shortnerServicePath'] || "";
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
			document.getElementById('serviceTwitterAuthPath').value = localStorage['shortnerServiceTwitterAuthPath'] || "";
			document.getElementById('serviceTwitterAuthCallbackPath').value = localStorage['shortnerServiceTwitterAuthCallbackPath'] || "";
			document.getElementById('serviceTwitterUpdateStatusPath').value = localStorage['shortnerServiceTwitterUpdateStatusPath'] || "";
			document.getElementById('loggedOn').style.display = "none";
			document.getElementById('loggedOff').style.display = "block";
		}
	},
	
	twitterSingIn: function() {
		if(document.getElementById('serviceTwitterAuthPath').value != '' && document.getElementById('serviceTwitterAuthCallbackPath').value != '' && document.getElementById('serviceTwitterUpdateStatusPath').value != '') {
			localStorage['shortnerServiceTwitterAuthPath'] = document.getElementById('serviceTwitterAuthPath').value;
			localStorage['shortnerServiceTwitterAuthCallbackPath'] = document.getElementById('serviceTwitterAuthCallbackPath').value;
			localStorage['shortnerServiceTwitterUpdateStatusPath'] = document.getElementById('serviceTwitterUpdateStatusPath').value;
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
		localStorage['shortnerServiceDomain'] = document.getElementById('serviceDomain').value;
		localStorage['shortnerServicePath'] = document.getElementById('servicePath').value;
		document.getElementById('saveMessage').innerText = "Saved!";
	}
};
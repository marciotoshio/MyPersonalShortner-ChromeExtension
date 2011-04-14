var shortner = {
	init: function() {
		shortner.getCurrentUrl();
	},
	
	getServiceUrl: function() {
		return localStorage['shortnerServiceUrl'];
	},
	
	getCurrentUrl: function() {
		chrome.tabs.getSelected(null, function(tab){
			var serviceUrl = shortner.getServiceUrl();
			if(serviceUrl != null)
			{
				common.xhrRequest(serviceUrl, 'POST', 'url=' + tab.url, shortner.handleRequest);
			}
			else
			{
				common.handleError({'Message': 'Service url not saved. Please go to the options page.'})
			}
		});
	},
	
	handleRequest: function() {
		if (this.readyState == 4) {
			var result = JSON.parse(this.responseText);
			if(this.status == 200) {
				shortner.handleSuccess(result.Url);
			}
			else {
				common.handleError(result);
			}
		}
	},
	
	handleSuccess: function(url) {
		document.getElementById('shortnedUrl').value = url;
		document.getElementById('error').style.display = "none";
		document.getElementById('loading').style.display = "none";
	}
};
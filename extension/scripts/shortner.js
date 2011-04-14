var settings = {
	serviceUrl: "http://localhost:7981/Api/Shorten"
};

var shortner = {
	init: function() {
		shortner.getCurrentUrl();
	},
	
	getCurrentUrl: function() {
		chrome.tabs.getSelected(null, function(tab){
			common.xhrRequest(settings.serviceUrl, 'POST', 'url=' + tab.url, shortner.handleRequest);
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
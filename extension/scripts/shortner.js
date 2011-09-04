var shortner = {
	init: function() {
		shortner.getCurrentUrl();
		shortner.manageSharingWith();
	},
	
	getServiceUrl: function() {
		return localStorage['shortnerServiceDomain'] + '/Api/Shorten';
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
				document.getElementById('loading').style.display = "none";
				document.getElementById('sharing').style.display = "none";
			}
		}
	},
	
	handleSuccess: function(url) {
		document.getElementById('shortnedUrl').value = url;
		document.getElementById('error').style.display = "none";
		document.getElementById('loading').style.display = "none";
	},
	
	manageSharingWith: function() {
		var p = document.getElementById('sharingWith');
		if(twitter.isLoggedOn())
		{
			var img = shortner.createImage('images/twitter.png', 'Twitter');
			p.appendChild(img);
		}
		p.style.display = "block";
	},
	
	createImage: function(src, alt) {
		var img = document.createElement('img');
		img.setAttribute('src', src);
		img.setAttribute('alt', alt);
		img.setAttribute('class', 'share');
		return img;
	},
	
	share: function () {
		var text = document.getElementById('shortnedUrl').value;
		if(text != '') {
			shortner.shareWithTwitter(text);
		}
		else {
			common.handleError({'Message': 'Nothing to share!'})
		}
	},
	
	shareWithTwitter: function(status) {
		twitter.updateStatus(status, shortner.handleTwitterUpdate);
	},
	
	handleTwitterUpdate: function(resp) {
		if (this.readyState == 4) {
			var result = JSON.parse(this.responseText);
			if(this.status == 200) {
				shortner.handleTwitterUpdateSuccess();
			}
			else {
				common.handleError({'Message': result.error});
				document.getElementById('loading').style.display = "none";
				document.getElementById('sharing').style.display = "none";
			}
		}
	},
	
	handleTwitterUpdateSuccess: function() {
		document.getElementById('shortnedUrl').value = "";
		document.getElementById('successMessage').innerText = "Twitter status updated.";
		document.getElementById('success').style.display = "block";
	}
	
};
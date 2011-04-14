var common = {
	xhrRequest: function (url, method, params, callback) {
		var request = new XMLHttpRequest();
		request.open(method, settings.serviceUrl, true);
		if(method == 'POST')
		{
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		request.onreadystatechange  = callback;
		request.send(params);
	},
	
	handleError: function(error) {
		document.getElementById('errorTitle').innerText = error.Message;
		if(error.Errors != null && error.Errors.length > 0)
		{
			var ul = document.getElementById('errorMessages');
			common.createErrorMessages(ul, error.Errors);
		}
		document.getElementById('error').style.display = "block";
		document.getElementById('loading').style.display = "none";
	},
	
	createErrorMessages: function(ul, messages) {
		ul.innerHtml = "";
		for(var i = 0; i < messages.length; i++) {
			var li = document.createElement('li');
			li.innerText = messages[i];
			ul.appendChild(li);
		}
	},
	
	bgPage: function() {
		return chrome.extension.getBackgroundPage();
	}
};
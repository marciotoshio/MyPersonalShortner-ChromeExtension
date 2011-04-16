var common = {
	xhrRequest: function (url, method, data, callback, optionalHeader) {
		var request = new XMLHttpRequest();
		request.onreadystatechange  = callback;
		request.open(method, url, true);
		if(method == 'POST')
		{
			request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		}
		if(optionalHeader != null)
		{
			request.setRequestHeader(optionalHeader.key, optionalHeader.value);
		}
		
		request.send(data);
	},
	
	handleError: function(error) {
		document.getElementById('errorTitle').innerText = error.Message;
		if(error.Errors != null && error.Errors.length > 0)
		{
			var ul = document.getElementById('errorMessages');
			common.createErrorMessages(ul, error.Errors);
		}
		document.getElementById('error').style.display = "block";
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
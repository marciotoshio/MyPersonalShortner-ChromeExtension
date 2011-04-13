var settings = {
	serviceUrl: "http://localhost:7981/Api/Shorten"
}

function init() {
	getCurrentUrl();
}

function getCurrentUrl()
{
	chrome.tabs.getSelected(null, function(tab){
		createRequest(tab.url);
	});
}

function createRequest(url){
	var request = new XMLHttpRequest();
	request.open("POST", settings.serviceUrl, true);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.onreadystatechange  = handleRequest;
	request.send("url=" + url);
}

function handleRequest() {
	if (this.readyState == 4) {
		var result = JSON.parse(this.responseText);
		if(this.status == 200) {
			handleSuccess(result.Url);
		}
		else {
			handleError(result);
		}
	}
}

function handleSuccess(url) {
	document.getElementById('shortnedUrl').innerText = url;
	document.getElementById('success').style.display = "block";
	document.getElementById('error').style.display = "none";
	document.getElementById('loading').style.display = "none";
}

function handleError(error) {
	document.getElementById('errorTitle').innerText = error.Message;
	if(error.Errors != null && error.Errors.length > 0)
	{
		var ul = document.getElementById('errorMessages');
		createErrorMessages(ul, error.Errors);
	}
	document.getElementById('error').style.display = "block";
	document.getElementById('success').style.display = "none";
}

function createErrorMessages(ul, messages) {
	ul.innerHtml = "";
	for(var i = 0; i < messages.length; i++) {
		var li = document.createElement('li');
		li.innerText = messages[i];
		ul.appendChild(li);
	}
}
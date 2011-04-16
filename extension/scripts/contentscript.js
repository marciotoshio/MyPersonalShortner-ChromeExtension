chrome.extension.sendRequest(JSON.parse(document.body.innerText), function(response) {
	if(!response.success) {
		document.body.innerText = "Error!";
	}
});
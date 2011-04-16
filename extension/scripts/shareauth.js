function ShareAuth(auth_url, auth_scope, opt_args) {
    this.auth_url = auth_url;
    this.auth_scope = "_" + auth_scope;
    this.key_token = "oauth_token";
    this.key_token_secret = "oauth_token_secret";

    this.callback_page = opt_args && opt_args['callback_page'] || "shareauth.html";
};

/*******************************************************************************
* PUBLIC API METHODS
* Call these from your background page.
******************************************************************************/

ShareAuth.initBackgroundPage = function (auth_config) {
    window.shareAuthConfig = auth_config;
    window.shareAuth = ShareAuth.fromConfig(auth_config);

    var url_match = chrome.extension.getURL(window.ShareAuth.callback_page);
    var tabs = {};

    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request.Success) {
			ShareAuth.getShareAuth().saveTokens(request.AccessToken.Token, request.AccessToken.TokenSecret);
			chrome.tabs.remove(sender.tab.id);
            sendResponse({ 'success': true });
        }
        else {
            sendResponse({ 'success': false }); // snub them.
        }
    });
	
	return window.shareAuth;
};

ShareAuth.prototype.authorize = function (callback) {
    if (this.hasToken()) {
        callback(this.getToken(), this.getTokenSecret());
    } else {
        chrome.tabs.create({ 'url': chrome.extension.getURL(this.callback_page) });
    }
};

ShareAuth.prototype.clearTokens = function () {
    delete localStorage[this.key_token + encodeURI(this.auth_scope)];
    delete localStorage[this.key_token_secret + encodeURI(this.auth_scope)];
};

ShareAuth.prototype.hasToken = function () {
    return !!this.getToken();
};

/*******************************************************************************
* PRIVATE API METHODS
* Used by the library.  There should be no need to call these methods directly.
******************************************************************************/

ShareAuth.fromConfig = function (auth_config) {
    return new ShareAuth(
		auth_config['auth_url'],
		auth_config['auth_scope']
	);
};

ShareAuth.initCallbackPage = function () {
    window.location.href = ShareAuth.getShareAuth().auth_url;
};

ShareAuth.getShareAuth = function() {
	var background_page = chrome.extension.getBackgroundPage();
    var auth_config = background_page.shareAuthConfig;
    return ShareAuth.fromConfig(auth_config);
}

ShareAuth.prototype.saveTokens = function (token, tokenSecret) {
    this.setToken(token);
    this.setTokenSecret(tokenSecret);
};

ShareAuth.prototype.setToken = function (token) {
    localStorage[this.key_token + encodeURI(this.auth_scope)] = token;
};

ShareAuth.prototype.getToken = function () {
    return localStorage[this.key_token + encodeURI(this.auth_scope)];
};

ShareAuth.prototype.setTokenSecret = function (secret) {
    localStorage[this.key_token_secret + encodeURI(this.auth_scope)] = secret;
};

ShareAuth.prototype.getTokenSecret = function () {
    return localStorage[this.key_token_secret + encodeURI(this.auth_scope)];
};
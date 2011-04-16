function ShareAuth(auth_scope, opt_args) {
    this.auth_scope = "_" + auth_scope;
    this.key_token = "oauth_token";
    this.key_token_secret = "oauth_token_secret";
	this.key_screen_name = "screen_name";
    this.callback_page = opt_args && opt_args['callback_page'] || "shareauth.html";
};

ShareAuth.initBackgroundPage = function (auth_config) {
    window.shareAuthConfig = auth_config;
    window.shareAuth = ShareAuth.fromConfig(auth_config);
    chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
        if (request.Success) {
			ShareAuth.getShareAuth().saveTokens(request.AccessToken.Token, request.AccessToken.TokenSecret);
			ShareAuth.getShareAuth().setScreenName(request.ScreenName);
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
        callback();
    } else {
        chrome.tabs.create({ 'url': chrome.extension.getURL(this.callback_page) }, function(tabCreated){
			chrome.tabs.onRemoved.addListener(function(tabId, removeInfo) {
				if(tabCreated.id == tabId) {
					callback(ShareAuth.getShareAuth().getToken(), ShareAuth.getShareAuth().getTokenSecret());
				}
			});
		});
    }
};

ShareAuth.prototype.clearTokens = function () {
    delete localStorage[this.key_token + encodeURI(this.auth_scope)];
    delete localStorage[this.key_token_secret + encodeURI(this.auth_scope)];
	delete localStorage[this.key_screen_name + encodeURI(this.auth_scope)];
};

ShareAuth.prototype.hasToken = function () {
    return !!this.getToken();
};

ShareAuth.prototype.saveTokens = function (token, tokenSecret) {
    this.setToken(token);
    this.setTokenSecret(tokenSecret);
};

ShareAuth.prototype.setScreenName = function (screenName) {
    localStorage[this.key_screen_name + encodeURI(this.auth_scope)] = screenName;
};

ShareAuth.prototype.getScreenName = function () {
    return localStorage[this.key_screen_name + encodeURI(this.auth_scope)];
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

ShareAuth.fromConfig = function (auth_config) {
    return new ShareAuth(
		auth_config['auth_scope']
	);
};

ShareAuth.initCallbackPage = function () {
    window.location.href = localStorage["shortnerServiceDomain"] + localStorage["shortnerServiceTwitterAuthPath"] + '?callbackUrl=' + localStorage["shortnerServiceTwitterAuthCallbackPath"];
};

ShareAuth.getShareAuth = function() {
	var background_page = chrome.extension.getBackgroundPage();
    var auth_config = background_page.shareAuthConfig;
    return ShareAuth.fromConfig(auth_config);
}
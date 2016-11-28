var simpleStorage = require("sdk/simple-storage");
var Request = require("sdk/request").Request;

var OneDrive = (function() {
  var appInfo = {
    client_id:      "37f653a2-df16-4cb6-8a81-109504cbf315",
    redirect_uri:   "https://www.auth.was.successful/",
    client_secret:  "ByXpk9qce7vX8yURd0PXUoc",
    scopes:         "onedrive.readwrite wl.offline_access",
    auth_url:       "https://login.live.com/oauth20_authorize.srf",
    token_url:      "https://login.live.com/oauth20_token.srf"
  };

  function redeemCode(code, callback) {
    var requestToken = Request({
      url: appInfo.token_url,
      contentType: "application/x-www-form-urlencoded",
      content: {
        client_id: appInfo.client_id,
        redirect_uri: appInfo.redirect_uri,
        client_secret: appInfo.client_secret,
        code: code,
        grant_type: "authorization_code"
      },
      onComplete: function(response) {
        //console.log(response.json);
        simpleStorage.storage.onedrive.access_token =
          response.json.access_token;
        simpleStorage.storage.onedrive.refresh_token =
          response.json.refresh_token;
        simpleStorage.storage.onedrive.expires_in =
          response.json.expires_in * 1000;
        simpleStorage.storage.onedrive.expires_on =
          Date.now() + (response.json.expires_in * 1000) - 100000;
        console.log(simpleStorage.storage.onedrive);
        return callback;
      }
    });

    requestToken.post();
  }

  function redeemRefresh(callback) {
    var requestToken = Request({
      url: onedriveAppInfo.token_url,
      contentType: "application/x-www-form-urlencoded",
      content: {
        client_id: appInfo.client_id,
        redirect_uri: appInfo.redirect_uri,
        client_secret: appInfo.client_secret,
        refresh_token: simpleStorage.storage.onedrive.refresh_token
      },
      onComplete: function(response) {
        simpleStorage.storage.onedrive.access_token =
          response.json.access_token;
        simpleStorage.storage.onedrive.refresh_token =
          response.json.refresh_token;
        simpleStorage.storage.onedrive.expires_in =
          response.json.expires_in * 1000;
        simpleStorage.storage.onedrive.expires_on =
          Date.now() + (response.json.expires_in * 1000) - 100000;
        return callback;
      }
    });

    requestToken.post();
  }

  function checkAccessToken() {
    if (Date.now() > simpleStorage.storage.onedrive.expires_on) {
      return true;
    }
    return false;
  }

  function getLoginURL() {
    return appInfo.auth_url + "?" +
      "client_id=" + appInfo.client_id +
      "&scope=" + appInfo.scopes +
      "&response_type=code" +
      "&redirect_uri=" + appInfo.redirect_uri;
  }

  return {
    appInfo:          appInfo,
    getLoginURL:      getLoginURL,
    redeemCode:       redeemCode,
    redeemRefresh:    redeemRefresh,
    checkAccessToken: checkAccessToken
  }
})();

exports.OneDrive = OneDrive;

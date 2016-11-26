var self = require("sdk/self");
var actionButtons = require("sdk/ui/button/action");
var toggleButtons = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var simpleStorage = require("sdk/simple-storage");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

var onedriveAppInfo = {
  client_id:      "37f653a2-df16-4cb6-8a81-109504cbf315",
  redirect_uri:   "https://www.auth.was.successful/",
  client_secret:  "ByXpk9qce7vX8yURd0PXUoc",
  scopes:         "onedrive.readwrite offline_access"
};

simpleStorage.storage.onedriveCode = "";

var button = toggleButtons.ToggleButton({
  id: "fast-save-pref-button",
  label: "Fast Image Save",
  icon: {
    "16": self.data.url("icon/icon-16.png"),
    "32": self.data.url("icon/icon-32.png"),
    "64": self.data.url("icon/icon-64.png")
  },
  onClick: handleActionButtonClick
});

var loginPanel = panels.Panel({
  contentURL: "https://login.live.com/oauth20_authorize.srf?" +
    "client_id=" + onedriveAppInfo.client_id +
    "&scope=" + onedriveAppInfo.scopes +
    "&response_type=code" +
    "&redirect_uri=" + onedriveAppInfo.redirect_uri,
  contentScriptFile: self.data.url("js/onedrive.js"),
  contentScriptWhen: "ready",
  height: 500,
  onHide: handleSettingsPanelHide
});

loginPanel.on('show', function(e) {
  loginPanel.port.on('gotCode', function(code) {
    console.log("the code is:", code);
  });
});

function handleActionButtonClick(state) {
  console.log("Button clicked...");
  if (state.checked) {
    loginPanel.show({
      position: button
    });
  }
}

function handleSettingsPanelHide() {
  button.state('window', { checked: false });
}

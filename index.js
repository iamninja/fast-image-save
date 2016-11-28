var self = require("sdk/self");
var actionButtons = require("sdk/ui/button/action");
var toggleButtons = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");
var simpleStorage = require("sdk/simple-storage");
var Request = require("sdk/request").Request;

var OneDrive = require("./lib/onedrive.js").OneDrive;

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

if (!simpleStorage.storage.onedrive)
  simpleStorage.storage.onedrive = {};

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
  contentURL: OneDrive.getLoginURL(),
  contentScriptFile: self.data.url("js/onedrive.js"),
  contentScriptWhen: "ready",
  height: 500,
  onHide: handleSettingsPanelHide
});

loginPanel.on('show', function(e) {
  loginPanel.port.on('gotCode', function(code) {
    loginPanel.contentURL = self.data.url("html/loading.html");
    console.log("the code is:", code);
    var res = OneDrive.redeemCode(code, () => {
      console.log("saved everything");
    });
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

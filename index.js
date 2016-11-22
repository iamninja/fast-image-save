var self = require("sdk/self");
var actionButtons = require("sdk/ui/button/action");
var toggleButtons = require("sdk/ui/button/toggle");
var panels = require("sdk/panel");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

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

var settingsPanel = panels.Panel({
  contentURL: self.data.url("html/settingsPanel.html"),
  onHide: handleSettingsPanelHide
});

function handleActionButtonClick(state) {
  console.log("Button clicked...");
  if (state.checked) {
    settingsPanel.show({
      position: button
    });
  }
}

function handleSettingsPanelHide() {
  button.state('window', { checked: false });
}

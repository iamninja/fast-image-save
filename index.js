var self = require("sdk/self");
var buttons = require("sdk/ui/button/action");

// a dummy function, to show how tests work.
// to see how to test this function, look at test/test-index.js
function dummy(text, callback) {
  callback(text);
}

exports.dummy = dummy;

var button = buttons.ActionButton({
  id: "fast-save-pref-button",
  label: "Fast Image Save",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleActionButtonClick
});

function handleActionButtonClick(state) {
  console.log("Button clicked...");
}

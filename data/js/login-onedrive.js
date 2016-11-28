if(!window.HashChangeEvent)(function(){
  console.log("no hashchangeevent");
  var lastURL=document.URL;
  window.addEventListener("hashchange",function(event){
    Object.defineProperty(event,"oldURL",{enumerable:true,configurable:true,value:lastURL});
    Object.defineProperty(event,"newURL",{enumerable:true,configurable:true,value:document.URL});
    lastURL=document.URL;
  });
}());

window.onhashchange = function() {
  console.log("onhashchange fired");
  console.log(window.location.href);
}

//window.on("ready", () => {console.log(window.location.href);})
window.onbeforeunload = function(e) {
  console.log("unloading " + e);
}


function simpleParams(url) {
  var queryString = url.split('?')[1];
  var params = {};
  if (queryString) {
    queryString = queryString.split('#')[0];
    var arr =queryString.split('&');
    for (var i=0; i<arr.length; i++) {
      var paramArr = paramString.split('=');
      params[paramArr[0]] = paramArr[1];
    }
  }
  return params;
}

function getParam(param) {
  var params = document.location.href.split('?')[1].split('&');

  for (var i = 0; i < params.length; i++) {
    var p=params[i].split('=');
	  if (p[0] == param) {
	    return decodeURIComponent(p[1]);
	  }
  }
  return false;
}

document.addEventListener("DOMContentLoaded", function(event) {
  console.log("----->dom loaded");
  if ((document.location.origin === 'https://www.auth.was.successful') && (getParam('code') !== false )) {
    console.log("redy to emit...");
    self.port.emit('gotCode', getParam('code'));
  }
});

//self.port.on('check', function(e) {
//  console.log(e);
//  console.log("----> heard it");
//});



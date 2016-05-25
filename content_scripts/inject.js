/*
* Content Script: inject.js
* Author: Junkai Yang
*/
var extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
var id = chrome.runtime.id;

var ifWindowExists = function () {
    return document.getElementById(id) != null;
}

if (!location.ancestorOrigins.contains(extensionOrigin)) {
    var iframe 
    
    // test if the menu window has already existed
    if (!ifWindowExists()) {
        iframe = document.createElement('iframe');
        // Must be declared at web_accessible_resources in manifest.json
        iframe.src = chrome.runtime.getURL('pages/menu.html');
        iframe.id = chrome.runtime.id;
        iframe.dataset.shown = false;
        iframe.style.cssText = 'position:fixed;top:0;right:0;display:block;' +
            'width:0;height:0;z-index:2999999999;border:none;';
        document.body.appendChild(iframe);
    }else{
        iframe = document.getElementById(id);
    }

    if (iframe.dataset.shown == "false") {
        window.parent.postMessage({ application: 'video_caption', type: "UI_SHOW", message: "" }, "*");
    }else{
        window.parent.postMessage({ application: 'video_caption', type: "UI_HIDE", message: "" }, "*");
    }
}
 chrome.browserAction.onClicked.addListener(function(tab) {
 				chrome.tabs.executeScript(null, {file:"midi.js"}, function () {
                
	                chrome.tabs.executeScript(null, {file:"cornify.js"}, function () {
	                    chrome.tabs.sendRequest(tab.id, 'cornify_page');
	                });
                });
            });
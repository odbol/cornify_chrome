chrome.browserAction.onClicked.addListener(function(tab) {
		
		// start the element chooser UI
		chrome.tabs.executeScript(null, {file:"lib/jquery.js"}, function () {

			chrome.tabs.executeScript(null, {file:"lib/backbone/underscore.js"}, function () {
				chrome.tabs.executeScript(null, {file:"lib/backbone/mustache.js"}, function () {
					chrome.tabs.executeScript(null, {file:"lib/jQuery.DomOutline/jquery.dom-outline-1.0.js"}, function () {
						chrome.tabs.executeScript(null, {file:"button_chooser.css"}, function () {
							chrome.tabs.executeScript(null, {file:"button_chooser.js"}, function () {
								
							});
						});
					});
				});
			});	
		});



				// this is now done automatically by the content script.
				// chrome.tabs.executeScript(null, {file:"midi.js"}, function () {

				//	chrome.tabs.executeScript(null, {file:"cornify.js"}, function () {
				//		chrome.tabs.sendRequest(tab.id, 'cornify_page');
				//	});
				// });
	});
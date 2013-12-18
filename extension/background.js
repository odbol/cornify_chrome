var SamplePlayer = function (url) {
	
	// Fix up prefixing
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();

	var sparkleBuffer = null,
		onError = function (msg) {
			console.log(msg);
		},
		loadSound = function loadSound(url) {
			var request = new XMLHttpRequest();
			request.open('GET', url, true);
			request.responseType = 'arraybuffer';

			// Decode asynchronously
			request.onload = function() {
				context.decodeAudioData(request.response, function(buffer) {
					sparkleBuffer = buffer;
				}, onError);
			}
			request.send();
		},

		playSound = function playSound(buffer) {
			var source = context.createBufferSource(); // creates a sound source
			source.buffer = buffer;                    // tell the source which sound to play
			source.connect(context.destination);       // connect the source to the context's destination (the speakers)
			source.start(0);                           // play the source now
			                                         // note: on older systems, may have to use deprecated noteOn(time);
		};

	loadSound(url);

	return {
		play: function () {
			if (sparkleBuffer) {
				playSound(sparkleBuffer);
			}
		}
	};
};

// set up local sound player
var sparkle = SamplePlayer("sparkle.mp3"),
	
	// for extra surprise: every refresh brings you closer to the unicorn apocalypse
	shouldStart = function () {
		var countdown = parseInt(localStorage.getItem("COUNTDOWN_TO_FABULOUSNESS"), 10);

		if (countdown === 0) {
			return true;
		}
		else if (countdown > 0) {
			localStorage.setItem("COUNTDOWN_TO_FABULOUSNESS", countdown - 1);
		}

		return false;
	};


// enable prankotron
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        
        if (request.play == 'sparkle') {
			sparkle.play();
        }
        // request from page if it should cornify or not. triggered by number of uses
        else if (request.checkCountdown) {
			sendResponse({
				shouldStart: shouldStart()
			});
        }
    }
);


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
				// 
				// 
	});
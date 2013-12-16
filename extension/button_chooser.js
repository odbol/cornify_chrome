
(function (exports) {
  
	if (!exports.buttonChooser) {
		var onChoseButton = function (element) { 
				console.log('Clicked element:', element); 

				var midiNote = prompt("Enter MIDI note to control this button: ", "*");
				if (midiNote) {

					if (midiNote == "*") {
						// TODO: add listener to click the element
					}
				}
				
				// Stop outline (also stopped on escape/backspace/delete keys):
				myDomOutline.stop();
			},
			myDomOutline = DomOutline({ 
				onClick: onChoseButton,
				border: 2,
				realtime: true
			}),
			choose = function () {

				// Start outline:
				myDomOutline.start();

				
			};

		exports.buttonChooser = {
			choose: choose
		};
	}

})(window);

window.buttonChooser.choose();
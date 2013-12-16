
(function (exports) {
  
	if (!exports.buttonChooser) {
		var animateElement = function (el) {
				var $el = jQuery(el);

				$el.removeClass("drumpants_buttonHit");
				$el.addClass("drumpants_buttonHit");

				// wait for animation to complete, then reverse it.
				setTimeout(function () {
					$el.removeClass("drumpants_buttonHit");
				}, 500); 
			},
			onChoseButton = function (element) { 
				console.log('Clicked element:', element); 

			// test animation by clicking anywhere
			// $("body").click(function () {
			// 	animateElement(element);
			// });

				var midiNote = prompt("Enter MIDI note to control this button: ", "*");
				if (midiNote) {

					// TODO: add MIDI note on listener to click the element
					midicorn({

						noteOn: function (pitch, vel) {
							
							if (midiNote == "*" || pitch == midiNote) {
								element.click();

								animateElement(element);
							}
						}
					});

					// TODO: keep track of noteOn callbacks and clean them up when done!
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
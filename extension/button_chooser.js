
(function (exports) {
  
	if (!exports.buttonChooser) {
		/*** TEMPLATES ****/
		var templateMIDI = '<div class="drumpants_midiForm">' +
							'<label>Type or play a note:</label>' + 
						   '<input type="text" class="midiNote" name="drumpants_midiNote" value="{{midiNote}}" placeholder="Midi Note" />' +
						   '<span class="delete drumpants_button">Clear</span>' +
						   '</div>';


		var animateElement = function (el) {
				var $el = jQuery(el);

				$el.removeClass("drumpants_buttonHit");
				$el.addClass("drumpants_buttonHit");

				// wait for animation to complete, then reverse it.
				setTimeout(function () {
					$el.removeClass("drumpants_buttonHit");
				}, 500); 
			},

			// key : MIDI Note pitch
			// value: HTML element to click
			elementForNote = {},

			removeNoteForElement = function (element) {
				// remove old mapping
				elementForNote = _.reject(elementForNote, function (el) {
					return el == element;
				});
			},

			findNoteForElement = function (element) {
				var note = null;

				_.each(elementForNote, function (el, idx) {
					if (el == element) {
						note = idx;
					}
				});

				return note;
			},

			// the DOM outliner
			myDomOutline,

			// the popup form if open
			currentForm,

			onMidiNote = function (pitch, vel) {
				var element;

				// the midi learn part
				if (currentForm) {
					currentForm.find('.midiNote')
						.value(pitch)
						.change(); // trigger save
				}

				// now check the element after midi learn has changed it.
				element = elementForNote[pitch] || elementForNote["all"];

				if (element) {
					element.click();

					animateElement(element);
				}
			},


			// shows a form to type a note on the element
			showLearnForm = function(element, sucesss) {
				var midiNote = findNoteForElement(element),
					html = Mustache.render(templateMIDI, { 
						midiNote: midiNote
					}),
					currentForm = $(html),
					closeForm = function () {
						currentForm.remove();
						currentForm = null;

						// Stop outline (also stopped on escape/backspace/delete keys):
						myDomOutline.stop();
					},
					overlayElements,
					box,
					pos;

				myDomOutline.pause();

				overlayElements = myDomOutline.showBox().getElements();
				box = overlayElements.bottom;
				pos = box.position();
				//box.empty()
					// enable clickin on the child elements!
					//.css('pointerEvents', 'auto');

				currentForm
					.appendTo('body')
					.css({
		                top: pos.top + box.height(),
		                left: pos.left
		            })
					.on('click', '.delete', function () {
						box.find('.midiNote').val('');

						removeNoteForElement(element);

						closeForm();
					})
					.on('change', '.midiNote', function () {
						var midiNoteElement = this,
							note = this.value;

						removeNoteForElement(element);

						if (note) {
							elementForNote[note] = element;
						}

						//closeForm();
					})
					.on('keyup', function (ev) {
						if (ev.keyCode == 13) {
							closeForm();
						}
					});
			},
			onChoseButton = function (element) { 
				console.log('Clicked element:', element); 


				showLearnForm(element, function (midiNote) {
						// if (midiNote) {

						// 	// TODO: add MIDI note on listener to click the element
						// 	midicorn({

						// 		noteOn: function (pitch, vel) {
									
						// 			if (midiNote == "*" || pitch == midiNote) {
						// 				element.click();

						// 				animateElement(element);
						// 			}
						// 		}
						// 	});

						// 	// TODO: keep track of noteOn callbacks and clean them up when done!
						// }
					});

			},
			choose = function () {

				// Start outline:
				myDomOutline.start();

				// TODO: add MIDI note on listener to click the element
				midicorn({
					noteOn: onMidiNote
				});
			};

		myDomOutline = DomOutline({ 
			onClick: onChoseButton,
			border: 2,
			realtime: true
		});

		// test animation by clicking anywhere
		// $("body").click(function () {
		// 	onMidiNote(60, 127);
		// });

		exports.buttonChooser = {
			choose: choose
		};
	}

})(window);

window.buttonChooser.choose();
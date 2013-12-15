/***

  MIDICORNS

  Trigger the unicorn apocolaypse with your MIDI instrument, 
  or perhaps your DrumPants.

  by Tyler Freeman
  http://www.drumpants.com

  Code adapted from the excellent SynthTemplate by Chris Wilson:
  https://github.com/cwilso/SynthTemplate/

***/
(function (exports) {
  if (!exports.midicorn) {
    var extend = function (toObj, fromObj) {
      for(var index in fromObj) { 
         if (fromObj.hasOwnProperty(index)) {
             toObj[index] = fromObj[index];
         }
      }

      return toObj;
    };



    var midiListener = {
          noteOff : function (noteNumber) {},
          noteOn : function (noteNumber, velocity) {},
          controller : function (noteNumber, velocity) {},
          pitchWheel : function (noteNumber, velocity) {}
        },


        midiMessageReceived = function midiMessageReceived( ev ) {
          var cmd = ev.data[0] >> 4;
          var channel = ev.data[0] & 0xf;
          var noteNumber = ev.data[1];
          var velocity = ev.data[2];

          if ( cmd==8 || ((cmd==9)&&(velocity===0)) ) { // with MIDI, note on with velocity zero is the same as note off
            // note off
            midiListener.noteOff( noteNumber );
          } else if (cmd == 9) {
            // note on
            midiListener.noteOn( noteNumber, velocity/127.0);
          } else if (cmd == 11) {
            midiListener.controller( noteNumber, velocity/127.0);
          } else if (cmd == 14) {
            // pitch wheel
            midiListener.pitchWheel( ((velocity * 128.0 + noteNumber)-8192)/8192.0 );
          }
        },

        selectMIDI = null,
        midiAccess = null,
        midiIn = null,

        changeMIDIPort = function changeMIDIPort() {
          midiIn = midiAccess.inputs()[ selectMIDI.selectedIndex ] ;
          midiIn.onmidimessage = midiMessageReceived;
        },

        selectMIDIIn = function selectMIDIIn( ev ) {
          var list=midiAccess.inputs();
          var selectedIndex = ev.target.selectedIndex;

          if (list.length >= selectedIndex) {
            midiIn = list[selectedIndex];
            midiIn.onmessage = midiMessageReceived;
          }
        },

        onMIDIStarted = function onMIDIStarted( midi ) {
          midiAccess = midi;

          //document.getElementById("synthbox").className = "loaded";

          // selectMIDI=document.getElementById("midiIn");
          // // clear the MIDI input select
          // selectMIDI.options.length = 0;


          var list=midiAccess.inputs();


          if (list.length) {
            // for (var i=0; i<list.length; i++) {
            //   selectMIDI.options[i]=new Option(list[i].name,list[i].fingerprint,i==0,i==0);
            // }
            // selectMIDI.onchange = selectMIDIIn;
            
            midiIn = list[0];
            midiIn.onmidimessage = midiMessageReceived;
            
          }
        },

        onMIDISystemError = function onMIDISystemError( msg ) {
          //document.getElementById("synthbox").className = "error";
          console.log( "Error encountered:" + msg );
        };
    //init: start up MIDI
    
    exports.midicorn = function(listener) { 
      // we will add your technological and biological distinctiveness to our own.
      midiListener = extend(midiListener, listener);

      navigator.requestMIDIAccess().then( onMIDIStarted, onMIDISystemError );
    };
  }
})(window);
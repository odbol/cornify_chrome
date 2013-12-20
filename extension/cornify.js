(function (exports) {
  
  if (exports.cornify) return;

  // number of notes it takes before cornify is activated
  var clicksTillApocalypse = 3;


  // for extra surprise: every refresh brings you closer to the unicorn apocalypse.
  // ask the background page how many refreshes we've done.
  chrome.runtime.sendMessage({checkCountdown: "hello"}, function(response) {

    if (response.shouldStart) {
      console.log("THERE BE UNICORNS APPROACHING!");

      var cornify = function () {
          var d = document,
              j = d.getElementById('__cornify_nodes'),
              k = null;
              
          if (!j) {
              k = d.createElement('div');
              k.id = '__cornify_nodes';
              d.getElementsByTagName('body')[0].appendChild(k);
          }
          
          cornify_add();
      };

      var playSound = function () {
        chrome.runtime.sendMessage({play: "sparkle"}, function(response) {
          console.log("Played sound");
        });
      };

      var cornify_count = 0;
      var cornify_add = function() {

        playSound();

        cornify_count += 1;
        var cornify_url = 'http://www.cornify.com/';
        var div = document.createElement('div');
        div.style.position = 'fixed';
        
        var numType = 'px';
        var heightRandom = Math.random()*.75;
        var windowHeight = 768;
        var windowWidth = 1024;
        var height = 0;
        var width = 0;
        var de = document.documentElement;
        if (typeof(window.innerHeight) == 'number') {
          windowHeight = window.innerHeight;
          windowWidth = window.innerWidth;
        } else if(de && de.clientHeight) {
          windowHeight = de.clientHeight;
          windowWidth = de.clientWidth;
        } else {
          numType = '%';
          height = Math.round( height*100 )+'%';
        }
        
        div.onclick = cornify_add;
        div.style.zIndex = 10;
        div.style.outline = 0;
        
        if( cornify_count==15 ) {
          div.style.top = Math.max( 0, Math.round( (windowHeight-530)/2 ) )  + 'px';
          div.style.left = Math.round( (windowWidth-530)/2 ) + 'px';
          div.style.zIndex = 1000;
        } else {
          if( numType=='px' ) div.style.top = Math.round( windowHeight*heightRandom ) + numType;
          else div.style.top = height;
          div.style.left = Math.round( Math.random()*90 ) + '%';
        }
        
        var img = document.createElement('img');
        var currentTime = new Date();
        var submitTime = currentTime.getTime();
        if( cornify_count==15 ) submitTime = 0;
        img.setAttribute('src',cornify_url+'getacorn.php?r=' + submitTime + '&url='+document.location.href);
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(div);
        div.appendChild(img);
        
        // Add stylesheet.
        if (cornify_count == 5) {
          var cssExisting = document.getElementById('__cornify_css');
          if (!cssExisting) {
            var head = document.getElementsByTagName("head")[0];
            var css = document.createElement('link');
            css.id = '__cornify_css';
            css.type = 'text/css';
            css.rel = 'stylesheet';
            css.href = 'http://www.cornify.com/css/cornify.css';
            css.media = 'screen';
            head.appendChild(css);
          }
          cornify_replace();
        } 
      },

      cornify_replace = function() {
        // Replace text.
        var hc = 6;
        var hs;
        var h;
        var k;
        var words = ['Happy','Sparkly','Glittery','Fun','Magical','Lovely','Cute','Charming','Amazing','Wonderful'];
        while(hc >= 1) {
          hs = document.getElementsByTagName('h' + hc);
          for (k = 0; k < hs.length; k++) {
            h = hs[k];
            h.innerHTML = words[Math.floor(Math.random()*words.length)] + ' ' + h.innerHTML;
          }
          hc-=1;
        }
      };

    

      exports.cornify = cornify;

    
      chrome.extension.onMessage.addListener(
          function(request, sender, sendResponse) {

              if (request.now) {
                cornify();
              }
              else if (request.enableMidi) {

              }
          }
      );

      // start listening for midi on notes
      if (midicorn) {
        midicorn({
          noteOn : function (noteNumber, velocity) {
              if (--clicksTillApocalypse < 0) {
                cornify();  
              }
            }
        });
      }

      // FOR TESTING:
      //document.getElementsByTagName('body')[0].addEventListener("click", cornify, false);
    }
  });
})(window);

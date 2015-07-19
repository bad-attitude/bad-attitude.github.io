// Adapted from https://airhorner.com/scripts/main.min.js

var Horn = function(path) {
  // The Horn Player.

  var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var source;
  var buffer;

  var loadSound = function(bufferObj, callback) {
    callback = callback || function() {};

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
      audioCtx.decodeAudioData(xhr.response, function(decodedBuffer) {
        callback(decodedBuffer);
      });
    };

    xhr.open('GET', path );
    xhr.responseType = 'arraybuffer';
    xhr.send();
  };


  this.start = function(loop, loopStart, loopEnd) {
    source = audioCtx.createBufferSource();

    source.connect(audioCtx.destination);

    source.buffer = buffer;

    source.start(0);
    source.loop = loop;
    source.loopStart = loopStart || 0;
    source.loopEnd = loopEnd || 1;
  };

  this.stop = function() {
    source.stop();
  };

  var init = function() {
    loadSound(buffer, function(decodedBuffer) {
      buffer = decodedBuffer;
    });
  };

  init();
};

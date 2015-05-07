var simply = require('pebble/ui/simply');

var Vibe = module.exports;

Vibe.vibrate = function(type) {
  simply.impl.vibe(type);
};

var util2 = require('pebble/lib/util2');
var myutil = require('pebble/lib/myutil');
var StageElement = require('pebble/ui/element');

var defaults = {
  backgroundColor: 'white',
  borderColor: 'clear',
};

var Rect = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.RectType;
};

util2.inherit(Rect, StageElement);

module.exports = Rect;

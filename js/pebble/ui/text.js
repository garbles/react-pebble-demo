var util2 = require('pebble/lib/util2');
var myutil = require('pebble/lib/myutil');
var Propable = require('pebble/ui/propable');
var StageElement = require('pebble/ui/element');

var textProps = [
  'text',
  'font',
  'color',
  'textOverflow',
  'textAlign',
  'updateTimeUnits',
];

var defaults = {
  backgroundColor: 'clear',
  borderColor: 'clear',
  color: 'white',
  font: 'gothic-24',
};

var Text = function(elementDef) {
  StageElement.call(this, myutil.shadow(defaults, elementDef || {}));
  this.state.type = StageElement.TextType;
};

util2.inherit(Text, StageElement);

Propable.makeAccessors(textProps, Text.prototype);

module.exports = Text;

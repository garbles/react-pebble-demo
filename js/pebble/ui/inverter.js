var util2 = require('pebble/lib/util2');
var myutil = require('pebble/lib/myutil');
var StageElement = require('pebble/ui/element');

var Inverter = function(elementDef) {
  StageElement.call(this, elementDef);
  this.state.type = StageElement.InverterType;
};

util2.inherit(Inverter, StageElement);

module.exports = Inverter;

var assign = require('react/lib/Object.assign');
var ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
var PebbleNode = require('./Node');

module.exports = function createComponent (name) {
  var ReactPebbleComponent = function (props) {
    this.node = new PebbleNode();
    this.subscriptions = null;
    this.listeners = null;
    this._mountImage = null;
    this._renderedChildren = null;
  };
  ReactPebbleComponent.displayName = name;

  for (var i = 1, l = arguments.length; i < l; i++) {
    assign(ReactPebbleComponent.prototype, arguments[i]);
  }

  return ReactPebbleComponent;
}

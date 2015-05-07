var React = require('react');
var createComponent = require('./createComponent');
var NodeMixin = require('./NodeMixin');

var Item = createComponent('Item', NodeMixin, {
  mountComponent (rootID, transaction, context) {
    this._rootNodeID = rootID;
    var props = this._currentElement.props;
    var list = context.instance;
    var items = list.items(0);
    list.items(0, items.concat(props));
    return this.node;
  },

  unmountComponent () {},
  receiveComponent (element, transaction, context) {
  }
});

module.exports = Item;

var React = require('react');
var ReactUpdates = require('react/lib/ReactUpdates');
var createComponent = require('./createComponent');
var ContainerMixin = require('./ContainerMixin');
var NodeMixin = require('./NodeMixin');
var UI = require('pebble/ui');

var List = createComponent('List', NodeMixin, ContainerMixin, {
  construct (element) {
    this._currentElement = element;
    this.__instance = new UI.Menu();
    this.__instance.sections([{}]);
  },

  mountComponent (rootID) {
    this._rootNodeID = rootID;
    var props = this._currentElement.props;
    var instance = this.__instance;
    var context = { instance };

    var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();
    transaction.perform(
      this.mountAndInjectChildren,
      this,
      props.children,
      transaction,
      context
    );
    ReactUpdates.ReactReconcileTransaction.release(transaction);

    instance.on('select', (event) => {
      props.onSelect && props.onSelect(event.item || {});
    });
    instance.show();

    return this.node;
  },

  unmountComponent () {
    this.__instance.off('select');
    this.__instance.hide();
  },

  receiveComponent (element, transaction) { /* TODO */ }
});

module.exports = List;

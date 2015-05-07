var React = require('react');
var assign = require('react/lib/Object.assign');
var createComponent = require('./createComponent');
var NodeMixin = require('./NodeMixin');
var UI = require('pebble/ui');

var emptyCard = {
  title: '',
  subtitle: '',
  body: '',
  icon: '',
  subicon: '',
  banner: ''
};

var Card = createComponent('Card', NodeMixin, {
  construct (element) {
    this._currentElement = element;
    var props = assign({}, emptyCard, element.props);
    this.__instance = new UI.Card(props);
  },

  mountComponent (rootID) {
    this._rootNodeID = rootID;
    var props = this._currentElement.props;

    // should probably be moved to applyNodeProps
    this.__instance.on('click', 'up', event => props && props.onUp(instance, event));
    this.__instance.on('click', 'down', event => props && props.onDown(instance, event));
    this.__instance.on('click', 'select', event => props && props.onSelect(instance, event));

    this.__instance.show();
    return this.node;
  },

  unmountComponent () {
    this.__instance.off('click');
    this.__instance.hide();
  },

  receiveComponent (element, transaction, context) {
    var props = assign({}, emptyCard, element.props);
    this.__instance.prop(props);
  }
});

module.exports = Card;

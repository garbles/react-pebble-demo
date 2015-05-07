var EventTypes = require('./EventTypes');

var NodeMixin = module.exports = {
  getPublicInstance () {
    return this.node;
  },

  putEventListener (type, listener) { /* TODO */ },
  handleEvent (event) { /* TODO */ },
  destroyEventListeners () { /* TODO */ },
  applyNodeProps (oldProps, newProps)  { /* TODO */ },
  mountComponentIntoNode () { /* TODO */ },

  construct (element) {
    this._currentElement = element;
  }
}

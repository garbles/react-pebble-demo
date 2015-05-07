var EventTypes = require('./EventTypes');

function Node () {
  this.children = [];
}

Node.prototype = {

  getRootLayer: function () {
    var root = this;
    while (root.parent) {
      root = root.parent;
    }
    return root;
  },

  inject: function (parent) {
    if (this.parent && this.parent !== parent) {
      this.remove();
    }
    if (!this.parent) {
      parent.addChild(this);
    }
  },

  injectBefore: function (parent, referenceLayer) {
    this.inject(parent);
  },

  addChild: function (child) {
    child.parent = this;
    this.children.push(child);
  },

  remove: function () {
    if (this.parent) {
      this.parent.children.splice(this.parent.children.indexOf(this), 1);
    }
  },

  subscribe: function (type, callback, callbackScope) {
    for (var eventType in EventTypes) {
      if (EventTypes[eventType] === type) {
        this[eventType] = callback;
      }
    }

    return this.removeEventListener.bind(this, type, callback, callbackScope);
  },

  addEventListener: function (type, callback, callbackScope) {
    for (var eventType in EventTypes) {
      if (EventTypes[eventType] === type) {
        delete this[eventType];
      }
    }
  },

  removeEventListener: function (type, callback, callbackScope) {
    var listeners = this.eventListeners[type];
    var listener;
    if (listeners) {
      for (var index=0, len=listeners.length; index < len; index++) {
        listener = listeners[index];
        if (listener.callback === callback &&
            listener.callbackScope === callbackScope) {
          listeners.splice(index, 1);
          break;
        }
      }
    }
  },

};

module.exports = Node;

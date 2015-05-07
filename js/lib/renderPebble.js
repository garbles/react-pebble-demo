var instantiateReactComponent = require('react/lib/instantiateReactComponent');
var ReactInstanceHandles = require('react/lib/ReactInstanceHandles');
var ReactUpdates = require('react/lib/ReactUpdates');
var ReactReconciler = require('react/lib/ReactReconciler');
var emptyObject = require('react/lib/emptyObject');
var rootID = ReactInstanceHandles.createReactRootID();

// da-fuq? document needs to be defined otherwise it won't run
if (!window.document) window.document = {};

var root;

module.exports = function renderPebble (element, overrideRoot = true) {
  var componentInstance = instantiateReactComponent(element, null);
  var transaction = ReactUpdates.ReactReconcileTransaction.getPooled();

  transaction.perform(function () {
    // hack so that I don't need the DOM
    // I don't really care about storing/retrieving root elements
    this._replaceNodeWithMarkupByID = function () {};
    ReactReconciler.mountComponent(this, rootID, transaction, emptyObject);
  }, componentInstance);

  transaction.perform(function () {
    if (overrideRoot) {
      root && ReactReconciler.unmountComponent(root);
      root = this;
    }
  }, componentInstance);

  ReactUpdates.ReactReconcileTransaction.release(transaction);

  return componentInstance.getPublicInstance();
}

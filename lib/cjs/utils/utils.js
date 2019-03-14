"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomStr = randomStr;
exports.setAttr = exports.getAndRemoveAttr = void 0;

var getAndRemoveAttr = function getAndRemoveAttr(jsxElement, attrName) {
  var attributes = jsxElement.openingElement.attributes;
  var value;
  var index = attributes.findIndex(function (attr, index) {
    if (attr.name && attr.name.name === attrName) {
      value = attr.value;
      return true;
    }
  });

  if (index !== -1) {
    attributes.splice(index, 1);
  }

  return value;
};

exports.getAndRemoveAttr = getAndRemoveAttr;

var setAttr = function setAttr(jsxElement, attr) {
  var attributes = jsxElement.openingElement.attributes;
  attributes.push(attr);
  jsxElement.openingElement.attributes = attributes;
  return jsxElement;
};

exports.setAttr = setAttr;

function randomStr() {
  return Math.random().toString(36).substring(7).split('').join('.');
}
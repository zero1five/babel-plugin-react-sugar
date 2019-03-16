"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomStr = exports.keyAttrBeing = exports.setAttr = exports.getAndRemoveAttr = void 0;

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

var keyAttrBeing = function keyAttrBeing(jsxElement) {
  var result = false;
  var attributes = jsxElement.openingElement.attributes;
  attributes.forEach(function (attr) {
    if (attr.name === 'key') {
      result = true;
    }
  });
  return result;
};

exports.keyAttrBeing = keyAttrBeing;

var randomStr = function randomStr() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

exports.randomStr = randomStr;
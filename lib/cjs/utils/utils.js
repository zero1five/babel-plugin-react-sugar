"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAndRemoveAttr = void 0;

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
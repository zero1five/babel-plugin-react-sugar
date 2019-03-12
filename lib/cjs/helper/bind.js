"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var types = _interopRequireWildcard(require("babel-types"));

var _require = require('@babel/helper-module-imports'),
    addDefault = _require.addDefault;

var _default = function _default() {
  var extracted = extractBindingValue(bindingValue, attrName);
  var wrappedExpr = types.callExpression(addDefault(nodePath, 'babel-plugin-react-binding/lib/runtime', {
    nameHint: 'binding'
  }), [nodePath.node, bindingValue.expression].concat((0, _toConsumableArray2.default)(extracted)));

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

exports.default = _default;
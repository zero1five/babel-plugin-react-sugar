"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.loopHelper = void 0;

var types = _interopRequireWildcard(require("babel-types"));

var _require = require('@babel/helper-module-imports'),
    addDefault = _require.addDefault;

var path = require('path');

var loopHelper = function loopHelper(nodePath, loopValue, attrName) {
  var v_rfor = loopValue.expression;
  var forArray = v_rfor.right;
  var forValue = v_rfor.left;
  var forKey = types.identifier('index');
  var forItem = nodePath.node;
  var wrappedExpr = types.expressionStatement(types.callExpression(types.memberExpression(forArray, types.identifier('map')), [types.arrowFunctionExpression([forValue, forKey], forItem)]));
  return wrappedExpr;
};

exports.loopHelper = loopHelper;
var _default = loopHelper;
exports.default = _default;
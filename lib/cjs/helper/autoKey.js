"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.autoKeyHelper = void 0;

var types = _interopRequireWildcard(require("babel-types"));

var _utils = require("../utils/utils");

var _require = require('@babel/helper-module-imports'),
    addDefault = _require.addDefault;

var path = require('path');

var autoKeyHelper = function autoKeyHelper(nodePath) {
  var wrappedExpr = types.callExpression(addDefault(nodePath, path.resolve('./lib/cjs/runtime/key'), {
    nameHint: 'addKey'
  }), [nodePath.node]);

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

exports.autoKeyHelper = autoKeyHelper;
var _default = autoKeyHelper;
exports.default = _default;
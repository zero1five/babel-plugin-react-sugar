"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.autoKeyHelper = void 0;

var types = _interopRequireWildcard(require("babel-types"));

var _esutils = _interopRequireDefault(require("esutils"));

var _utils = require("../utils/utils");

var _require = require('@babel/helper-module-imports'),
    addDefault = _require.addDefault;

var path = require('path');

var autoKeyHelper = function autoKeyHelper(nodePath) {
  nodePath.node.arguments[1].properties.push(types.jSXAttribute(types.jSXIdentifier('key'), types.stringLiteral((0, _utils.randomStr)())));
  return nodePath;
};

exports.autoKeyHelper = autoKeyHelper;
var _default = autoKeyHelper;
exports.default = _default;
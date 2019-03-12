'use strict';

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperBuilderReactJsx = _interopRequireDefault(require("@babel/helper-builder-react-jsx"));

var types = _interopRequireWildcard(require("babel-types"));

var _babelPluginSyntaxJsx = _interopRequireDefault(require("babel-plugin-syntax-jsx"));

var _default = (0, _helperPluginUtils.declare)(function (api, options) {
  api.assertVersion(7);

  var visitor = function visitor() {};

  return {
    name: 'react-sugar',
    inherits: _babelPluginSyntaxJsx.default,
    visitor: visitor
  };
});

exports.default = _default;
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _utils = require("@/utils/utils");

var addKey = function addKey(element) {
  var props = element.props;
  return _react.default.cloneElement(element, (0, _objectSpread2.default)({
    key: (0, _utils.randomStr)()
  }, props));
};

var _default = addKey;
exports.default = _default;
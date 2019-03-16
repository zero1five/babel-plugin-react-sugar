"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.bindHelper = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var types = _interopRequireWildcard(require("babel-types"));

var _require = require('@babel/helper-module-imports'),
    addDefault = _require.addDefault;

var path = require('path');

var extractMemberExpression = function extractMemberExpression(memberExpr) {
  /**
   * left-most item
   */
  if (memberExpr.type !== 'MemberExpression') {
    var type = memberExpr.type,
        name = memberExpr.name;
    /**
     * if the full memberExpr startWiths `state.` or `props.`,
     * treat it as a shorthand. add `this.` to left
     */

    if (type === 'Identifier' && (name === 'state' || name === 'props')) {
      return [types.thisExpression(), types.stringLiteral(name)];
    }

    return [memberExpr];
  }

  var property = memberExpr.property,
      computed = memberExpr.computed;
  /**
   * .xyz is an Identifier, should transform to StringLiteral
   */

  if (property.type === 'Identifier' && !computed) {
    property = types.stringLiteral(property.name);
  }

  return [].concat((0, _toConsumableArray2.default)(extractMemberExpression(memberExpr.object)), [property]);
};

var extractBindingValue = function extractBindingValue(jsxExprContainer, attrName) {
  if (jsxExprContainer.type !== 'JSXExpressionContainer' || jsxExprContainer.expression.type !== 'MemberExpression') {
    throw new TypeError("Value of attribute [".concat(attrName, "] ") + "(line ".concat(jsxExprContainer.loc.start.line, ") ") + 'is not a MemberExpression');
  }

  return extractMemberExpression(jsxExprContainer.expression);
};

var bindHelper = function bindHelper(nodePath, bindingValue, attrName) {
  var extracted = extractBindingValue(bindingValue, attrName);
  var wrappedExpr = types.callExpression(addDefault(nodePath, path.resolve('babel-plugin-react-sugar/lib/cjs/runtime'), {
    nameHint: 'binding'
  }), [nodePath.node, bindingValue.expression].concat((0, _toConsumableArray2.default)(extracted)));

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

exports.bindHelper = bindHelper;
var _default = bindHelper;
exports.default = _default;
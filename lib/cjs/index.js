'use strict';
/**
 * 得到对应的attr -》 调用对应的helper来处理
 * 提供对应的attrName -》 来更改
 * v-model v-for
 * 自动添加 key
 */

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperBuilderReactJsx = _interopRequireDefault(require("@babel/helper-builder-react-jsx"));

var types = _interopRequireWildcard(require("babel-types"));

var _babelPluginSyntaxJsx = _interopRequireDefault(require("babel-plugin-syntax-jsx"));

var _helperModuleImports = require("@babel/helper-module-imports");

var _bind = _interopRequireDefault(require("./helper/bind"));

var path = require('path');

var VModel = 'v-model';
var VFor = 'v-for';

var getAndRemoveBindingAttr = function getAndRemoveBindingAttr(jsxElement, attrName) {
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

function _default(babel) {
  // api.assertVersion(7);
  var visitor = {
    JSXElement: function JSXElement(nodePath, state) {
      var _this$opts$attrName = this.opts.attrName,
          attrName = _this$opts$attrName === void 0 ? VModel : _this$opts$attrName;
      var bindingValue = getAndRemoveBindingAttr(nodePath.node, attrName);
      if (!bindingValue) return;
      var extracted = extractBindingValue(bindingValue, attrName);
      var wrappedExpr = types.callExpression((0, _helperModuleImports.addDefault)(nodePath, path.resolve('./lib/cjs/runtime'), {
        nameHint: 'binding'
      }), [nodePath.node, bindingValue.expression].concat((0, _toConsumableArray2.default)(extracted)));

      if (nodePath.parent.type === 'JSXElement') {
        wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
      }

      nodePath.replaceWith(wrappedExpr);
    }
  };
  return {
    name: 'react-sugar',
    inherits: _babelPluginSyntaxJsx.default,
    visitor: visitor
  };
}
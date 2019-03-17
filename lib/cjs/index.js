'use strict';
/**
 * v-model code from https://github.com/meowtec/babel-plugin-react-binding
 */

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var t = _interopRequireWildcard(require("babel-types"));

var _babelPluginSyntaxJsx = _interopRequireDefault(require("babel-plugin-syntax-jsx"));

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _bind = require("./helper/bind");

var _loop = require("./helper/loop");

var _utils = require("./utils/utils");

var VModel = 'v-model';
var VFor = 'v-for';
var VIf = 'v-if';

var _default = (0, _helperPluginUtils.declare)(function (api, options) {
  api.assertVersion(7);
  var visitor = {
    JSXElement: function JSXElement(nodePath) {
      var _this$opts = this.opts,
          _this$opts$bindAttrNa = _this$opts.bindAttrName,
          bindAttrName = _this$opts$bindAttrNa === void 0 ? VModel : _this$opts$bindAttrNa,
          _this$opts$loopAttrNa = _this$opts.loopAttrName,
          loopAttrName = _this$opts$loopAttrNa === void 0 ? VFor : _this$opts$loopAttrNa,
          _this$opts$ifAttrName = _this$opts.ifAttrName,
          ifAttrName = _this$opts$ifAttrName === void 0 ? VIf : _this$opts$ifAttrName;
      var bindingValue = (0, _utils.getAndRemoveAttr)(nodePath.node, bindAttrName),
          loopAttrValue = (0, _utils.getAndRemoveAttr)(nodePath.node, loopAttrName),
          ifAttrValue = (0, _utils.getAndRemoveAttr)(nodePath.node, ifAttrName); // v-model

      while (bindingValue) {
        nodePath.replaceWith((0, _bind.bindHelper)(nodePath, bindingValue, bindAttrName));
        bindingValue = false;
      } // v-for


      while (loopAttrValue) {
        nodePath.replaceWithMultiple((0, _loop.loopHelper)(nodePath, loopAttrValue, loopAttrName));
        loopAttrValue = false;
      } // v-if


      if (ifAttrValue) {
        nodePath.replaceWith(t.ifStatement(ifAttrValue.expression, t.returnStatement(nodePath.node)));
      }
    },
    ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
      if (path.node.body.type !== 'JSXElement') {
        return;
      }

      if ((0, _utils.keyAttrBeing)(path.node.body)) {
        return;
      }

      (0, _utils.setAttr)(path.node.body, t.jSXAttribute(t.jSXIdentifier('key'), t.JSXExpressionContainer((0, _utils.randomStrExpression)())));
    },
    ArrayExpression: function ArrayExpression(path, state) {
      if (path.node.elements[0] && path.node.elements[0].type === 'JSXElement') {
        path.node.elements.forEach(function (element) {
          (0, _utils.setAttr)(element, t.jSXAttribute(t.jSXIdentifier('key'), t.JSXExpressionContainer((0, _utils.randomStrExpression)())));
        });
      }
    }
  };
  return {
    name: 'react-sugar',
    inherits: _babelPluginSyntaxJsx.default,
    visitor: visitor
  };
});

exports.default = _default;
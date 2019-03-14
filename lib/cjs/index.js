'use strict';
/**
 * 得到对应的attr -》 调用对应的helper来处理
 * 提供对应的attrName -》 来更改
 * v-model v-for
 * 自动添加 key
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

var _default = (0, _helperPluginUtils.declare)(function (api, options) {
  api.assertVersion(7);
  var visitor = {
    JSXElement: function JSXElement(nodePath, state) {
      var _this$opts = this.opts,
          _this$opts$bindAttrNa = _this$opts.bindAttrName,
          bindAttrName = _this$opts$bindAttrNa === void 0 ? VModel : _this$opts$bindAttrNa,
          _this$opts$loopAttrNa = _this$opts.loopAttrName,
          loopAttrName = _this$opts$loopAttrNa === void 0 ? VFor : _this$opts$loopAttrNa;
      var bindingValue = (0, _utils.getAndRemoveAttr)(nodePath.node, bindAttrName),
          loopAttrValue = (0, _utils.getAndRemoveAttr)(nodePath.node, loopAttrName); // v-model

      while (bindingValue) {
        nodePath.replaceWith((0, _bind.bindHelper)(nodePath, bindingValue, bindAttrName));
        bindingValue = false;
      } // v-for


      while (loopAttrValue) {
        nodePath.replaceWithMultiple((0, _loop.loopHelper)(nodePath, loopAttrValue, loopAttrName));
        loopAttrValue = false;
      }
    },
    ArrowFunctionExpression: function ArrowFunctionExpression(path, state) {
      if (path.node.body.type !== 'JSXElement') {
        return;
      }

      path.node.body.openingElement.attributes.push(t.jSXAttribute(t.jSXIdentifier('key'), t.JSXExpressionContainer(t.identifier('index'))));
    },
    ArrayExpression: function ArrayExpression(path, state) {
      if (path.node.elements[0] && path.node.elements[0].type === 'JSXElement') {
        path.node.elements.forEach(function (element) {
          var ranStr = (0, _utils.randomStr)();
          (0, _utils.setAttr)(element, t.jSXAttribute(t.jSXIdentifier('key'), t.JSXExpressionContainer(t.stringLiteral(ranStr))));
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
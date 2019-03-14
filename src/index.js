'use strict';

/**
 * 得到对应的attr -》 调用对应的helper来处理
 * 提供对应的attrName -》 来更改
 * v-model v-for
 * 自动添加 key
 */

import * as t from 'babel-types';
import jsx from 'babel-plugin-syntax-jsx';
import {declare} from '@babel/helper-plugin-utils';

const VModel = 'v-model';
const VFor = 'v-for';
const VIf = 'v-if';

import {bindHelper} from './helper/bind';
import {loopHelper} from './helper/loop';

import {getAndRemoveAttr, randomStr, setAttr} from './utils/utils';

export default declare((api, options) => {
  api.assertVersion(7);

  const visitor = {
    JSXElement(nodePath, state) {
      const {
        bindAttrName = VModel,
        loopAttrName = VFor,
        ifAttrName = VIf,
      } = this.opts;
      let bindingValue = getAndRemoveAttr(nodePath.node, bindAttrName),
        loopAttrValue = getAndRemoveAttr(nodePath.node, loopAttrName),
        ifAttrValue = getAndRemoveAttr(nodePath.node, ifAttrName);

      // v-model
      while (bindingValue) {
        nodePath.replaceWith(bindHelper(nodePath, bindingValue, bindAttrName));
        bindingValue = false;
      }

      // v-for
      while (loopAttrValue) {
        nodePath.replaceWithMultiple(
          loopHelper(nodePath, loopAttrValue, loopAttrName)
        );
        loopAttrValue = false;
      }

      // v-if
      if (ifAttrValue) {
        nodePath.replaceWith(
          t.ifStatement(
            ifAttrValue.expression,
            t.returnStatement(nodePath.node)
          )
        );
      }
    },
    ArrowFunctionExpression(path, state) {
      if (path.node.body.type !== 'JSXElement') {
        return;
      }
      path.node.body.openingElement.attributes.push(
        t.jSXAttribute(
          t.jSXIdentifier('key'),
          t.JSXExpressionContainer(t.identifier('index'))
        )
      );
    },
    ArrayExpression(path, state) {
      if (
        path.node.elements[0] &&
        path.node.elements[0].type === 'JSXElement'
      ) {
        path.node.elements.forEach(element => {
          const ranStr = randomStr();
          setAttr(
            element,
            t.jSXAttribute(
              t.jSXIdentifier('key'),
              t.JSXExpressionContainer(t.stringLiteral(ranStr))
            )
          );
        });
      }
    },
  };

  return {
    name: 'react-sugar',
    inherits: jsx,
    visitor,
  };
});

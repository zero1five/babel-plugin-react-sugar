'use strict';

/**
 * 得到对应的attr -》 调用对应的helper来处理
 * 提供对应的attrName -》 来更改
 * v-model v-for
 * 自动添加 key
 */

import {declare} from '@babel/helper-plugin-utils';
import helper from '@babel/helper-builder-react-jsx';
import * as t from 'babel-types';
import jsx from 'babel-plugin-syntax-jsx';
import {addDefault} from '@babel/helper-module-imports';

const VModel = 'v-model';
const VFor = 'v-for';

import {bindHelper} from './helper/bind';
import {loopHelper} from './helper/loop';
import {autoKeyHelper} from './helper/autoKey';

import {getAndRemoveAttr, randomStr} from './utils/utils';

export default declare((api, options) => {
  api.assertVersion(7);

  const visitor = {
    JSXElement(nodePath, state) {
      const {bindAttrName = VModel, loopAttrName = VFor} = this.opts;
      let bindingValue = getAndRemoveAttr(nodePath.node, bindAttrName),
        loopAttrValue = getAndRemoveAttr(nodePath.node, loopAttrName);

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
  };

  return {
    name: 'react-sugar',
    inherits: jsx,
    visitor,
  };
});

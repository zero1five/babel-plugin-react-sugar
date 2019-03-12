'use strict';

/**
 * 得到对应的attr -》 调用对应的helper来处理
 * 提供对应的attrName -》 来更改
 * v-model v-for
 * 自动添加 key
 */

import {declare} from '@babel/helper-plugin-utils';
import helper from '@babel/helper-builder-react-jsx';
import * as types from 'babel-types';
import jsx from 'babel-plugin-syntax-jsx';
import {addDefault} from '@babel/helper-module-imports';

const VModel = 'v-model';
const VFor = 'v-for';

import {bindHelper, getAndRemoveBindingAttr} from './helper/bind';

export default declare((api, options) => {
  api.assertVersion(7);

  const visitor = {
    JSXElement(nodePath, state) {
      const {bindAttrName = VModel, loopAttrName = VFor} = this.opts;
      let bindingValue = getAndRemoveBindingAttr(nodePath.node, bindAttrName);

      while (bindingValue) {
        nodePath.replaceWith(bindHelper(nodePath, bindingValue, bindAttrName));
        bindingValue = false;
      }
    },
  };

  return {
    name: 'react-sugar',
    inherits: jsx,
    visitor,
  };
});

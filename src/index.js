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

const path = require('path');

const VModel = 'v-model';
const VFor = 'v-for';

import bindHelper from './helper/bind';

const getAndRemoveBindingAttr = (jsxElement, attrName) => {
  const {attributes} = jsxElement.openingElement;

  let value;

  const index = attributes.findIndex((attr, index) => {
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

const extractMemberExpression = memberExpr => {
  /**
   * left-most item
   */
  if (memberExpr.type !== 'MemberExpression') {
    const {type, name} = memberExpr;

    /**
     * if the full memberExpr startWiths `state.` or `props.`,
     * treat it as a shorthand. add `this.` to left
     */
    if (type === 'Identifier' && (name === 'state' || name === 'props')) {
      return [types.thisExpression(), types.stringLiteral(name)];
    }

    return [memberExpr];
  }

  let {property, computed} = memberExpr;

  /**
   * .xyz is an Identifier, should transform to StringLiteral
   */
  if (property.type === 'Identifier' && !computed) {
    property = types.stringLiteral(property.name);
  }

  return [...extractMemberExpression(memberExpr.object), property];
};

const extractBindingValue = (jsxExprContainer, attrName) => {
  if (
    jsxExprContainer.type !== 'JSXExpressionContainer' ||
    jsxExprContainer.expression.type !== 'MemberExpression'
  ) {
    throw new TypeError(
      `Value of attribute [${attrName}] ` +
        `(line ${jsxExprContainer.loc.start.line}) ` +
        'is not a MemberExpression'
    );
  }

  return extractMemberExpression(jsxExprContainer.expression);
};

export default function(babel) {
  // api.assertVersion(7);

  const visitor = {
    JSXElement(nodePath, state) {
      const {attrName = VModel} = this.opts;
      const bindingValue = getAndRemoveBindingAttr(nodePath.node, attrName);

      if (!bindingValue) return;

      const extracted = extractBindingValue(bindingValue, attrName);

      let wrappedExpr = types.callExpression(
        addDefault(nodePath, path.resolve('./lib/cjs/runtime'), {
          nameHint: 'binding',
        }),
        [nodePath.node, bindingValue.expression, ...extracted]
      );

      if (nodePath.parent.type === 'JSXElement') {
        wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
      }

      nodePath.replaceWith(wrappedExpr);
    },
  };

  return {
    name: 'react-sugar',
    inherits: jsx,
    visitor,
  };
}

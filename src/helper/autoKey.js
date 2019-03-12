import * as types from 'babel-types';
import {setAttr, randomStr} from '../utils/utils';
const {addDefault} = require('@babel/helper-module-imports');
const path = require('path');

export const autoKeyHelper = nodePath => {
  let wrappedExpr = types.callExpression(
    addDefault(nodePath, path.resolve('./lib/cjs/runtime/key'), {
      nameHint: 'addKey',
    }),
    [nodePath.node]
  );

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

export default autoKeyHelper;

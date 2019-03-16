import * as types from 'babel-types';

const {
  addDefault
} = require('@babel/helper-module-imports');

const path = require('path');

export const loopHelper = (nodePath, loopValue, attrName) => {
  const v_rfor = loopValue.expression;
  let forArray = v_rfor.right;
  let forValue = v_rfor.left;
  let forKey = types.identifier('index');
  let forItem = nodePath.node;
  let wrappedExpr = types.expressionStatement(types.callExpression(types.memberExpression(forArray, types.identifier('map')), [types.arrowFunctionExpression([forValue, forKey], forItem)]));
  return wrappedExpr;
};
export default loopHelper;
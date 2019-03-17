import * as types from 'babel-types';

export const loopHelper = (nodePath, loopValue, attrName) => {
  const {
    expression: {right: forArray, left: forValue},
  } = loopValue;

  let forKey = types.identifier('index');
  let forItem = nodePath.node;

  let wrappedExpr = types.expressionStatement(
    types.callExpression(
      types.memberExpression(forArray, types.identifier('map')),
      [types.arrowFunctionExpression([forValue, forKey], forItem)]
    )
  );

  return wrappedExpr;
};

export default loopHelper;

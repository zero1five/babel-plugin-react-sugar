import * as types from 'babel-types';
const {addDefault} = require('@babel/helper-module-imports');

export default () => {
  const extracted = extractBindingValue(bindingValue, attrName);

  let wrappedExpr = types.callExpression(
    addDefault(nodePath, 'babel-plugin-react-binding/lib/runtime', {
      nameHint: 'binding',
    }),
    [nodePath.node, bindingValue.expression, ...extracted]
  );

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

import * as types from 'babel-types';
const {addDefault} = require('@babel/helper-module-imports');

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

export const bindHelper = (nodePath, bindingValue, attrName) => {
  const extracted = extractBindingValue(bindingValue, attrName);

  let wrappedExpr = types.callExpression(
    addDefault(nodePath, 'babel-plugin-react-sugar/lib/cjs/runtime', {
      nameHint: 'binding',
    }),
    [nodePath.node, bindingValue.expression, ...extracted]
  );

  if (nodePath.parent.type === 'JSXElement') {
    wrappedExpr = types.jSXExpressionContainer(wrappedExpr);
  }

  return wrappedExpr;
};

export default bindHelper;

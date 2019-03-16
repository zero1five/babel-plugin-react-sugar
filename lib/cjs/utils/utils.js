import { parse } from '@babel/parser';
export const getAndRemoveAttr = (jsxElement, attrName) => {
  const {
    attributes
  } = jsxElement.openingElement;
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
export const setAttr = (jsxElement, attr) => {
  const {
    attributes
  } = jsxElement.openingElement;
  attributes.push(attr);
  jsxElement.openingElement.attributes = attributes;
  return jsxElement;
};
export const keyAttrBeing = jsxElement => {
  let result = false;
  const {
    attributes
  } = jsxElement.openingElement;
  attributes.forEach(attr => {
    if (attr.name === 'key') {
      result = true;
    }
  });
  return result;
};
export const randomStr = () => {
  return Math.random().toString(36).substring(7).split('').join('.');
};
export const randomStrExpress = () => {
  const code = `Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('.');
  `;
  return parse(code).program.body[0].expression;
};
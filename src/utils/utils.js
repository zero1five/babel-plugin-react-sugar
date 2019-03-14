export const getAndRemoveAttr = (jsxElement, attrName) => {
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

export const setAttr = (jsxElement, attr) => {
  const {attributes} = jsxElement.openingElement;

  attributes.push(attr);
  jsxElement.openingElement.attributes = attributes;

  return jsxElement;
};

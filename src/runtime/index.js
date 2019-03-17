import React from 'react';

const getValue = e => {
  if (!e) return e;

  const {target} = e;

  if (target && target.tagName) {
    const {tagName, type} = target;
    if (tagName === 'INPUT' && (type === 'checkbox' || type === 'radio')) {
      return target.checked;
    } else {
      return target.value;
    }
  }

  return e;
};

const shallowClone = node => {
  if (Array.isArray(node)) {
    return [...node];
  } else {
    return {...node};
  }
};

const deepUpdate = (node, path, leaf) => {
  if (!path.length) {
    return leaf;
  }

  node = shallowClone(node);
  let root = node;

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      node[key] = leaf;
    } else {
      node[key] = shallowClone(node[key]);
      node = node[key];
    }
  });

  return root;
};

const setState = (instance, e, [key, ...rest]) => {
  const leaf = getValue(e);
  const node = instance.state[key];

  instance.setState({
    [key]: deepUpdate(node, rest, leaf),
  });
};

const setProps = (instance, e, [key, ...rest]) => {
  const {props} = instance;
  const leaf = getValue(e);
  const prop = props[key];
  const {eventName} = getInstanceBindingDescriptor(instance);

  const eventMethod = props[eventName];

  eventMethod && eventMethod(deepUpdate(prop, rest, leaf), key);
};

const getBindingDescriptor = element => {
  const {type, props} = element;
  let eventName = 'onChange';
  let propName = 'value';

  if (
    type === 'input' &&
    (props.type === 'checkbox' || props.type === 'radio')
  ) {
    propName = 'checked';
  }

  if (typeof type === 'function') {
    const {bindingDescriptor = {}} = type;
    eventName = bindingDescriptor.event || eventName;
    propName = bindingDescriptor.prop || propName;
  }

  return {
    propName,
    eventName,
  };
};

const getInstanceBindingDescriptor = instance => {
  const {bindingDescriptor = {}} = instance.constructor;

  const {
    prop: propName = 'value',
    event: eventName = 'onChange',
  } = bindingDescriptor;

  return {
    propName,
    eventName,
  };
};

const binding = (element, value, self, space, ...path) => {
  const {props} = element;
  const {propName, eventName} = getBindingDescriptor(element);

  const selfListener = props[eventName];

  return React.cloneElement(element, {
    [eventName](e) {
      if (space === 'state') {
        setState(self, e, path);
      }

      if (space === 'props') {
        setProps(self, e, path);
      }

      selfListener && selfListener(e);
    },

    [propName]: value,
  });
};

export default binding;

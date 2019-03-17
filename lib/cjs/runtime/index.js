"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireDefault(require("react"));

var getValue = function getValue(e) {
  if (!e) return e;
  var target = e.target;

  if (target && target.tagName) {
    var tagName = target.tagName,
        type = target.type;

    if (tagName === 'INPUT' && (type === 'checkbox' || type === 'radio')) {
      return target.checked;
    } else {
      return target.value;
    }
  }

  return e;
};

var shallowClone = function shallowClone(node) {
  if (Array.isArray(node)) {
    return (0, _toConsumableArray2.default)(node);
  } else {
    return (0, _objectSpread2.default)({}, node);
  }
};

var deepUpdate = function deepUpdate(node, path, leaf) {
  if (!path.length) {
    return leaf;
  }

  node = shallowClone(node);
  var root = node;
  path.forEach(function (key, index) {
    if (index === path.length - 1) {
      node[key] = leaf;
    } else {
      node[key] = shallowClone(node[key]);
      node = node[key];
    }
  });
  return root;
};

var setState = function setState(instance, e, _ref) {
  var _ref2 = (0, _toArray2.default)(_ref),
      key = _ref2[0],
      rest = _ref2.slice(1);

  var leaf = getValue(e);
  var node = instance.state[key];
  instance.setState((0, _defineProperty2.default)({}, key, deepUpdate(node, rest, leaf)));
};

var setProps = function setProps(instance, e, _ref3) {
  var _ref4 = (0, _toArray2.default)(_ref3),
      key = _ref4[0],
      rest = _ref4.slice(1);

  var props = instance.props;
  var leaf = getValue(e);
  var prop = props[key];

  var _getInstanceBindingDe = getInstanceBindingDescriptor(instance),
      eventName = _getInstanceBindingDe.eventName;

  var eventMethod = props[eventName];
  eventMethod && eventMethod(deepUpdate(prop, rest, leaf), key);
};

var getBindingDescriptor = function getBindingDescriptor(element) {
  var type = element.type,
      props = element.props;
  var eventName = 'onChange';
  var propName = 'value';

  if (type === 'input' && (props.type === 'checkbox' || props.type === 'radio')) {
    propName = 'checked';
  }

  if (typeof type === 'function') {
    var _type$bindingDescript = type.bindingDescriptor,
        bindingDescriptor = _type$bindingDescript === void 0 ? {} : _type$bindingDescript;
    eventName = bindingDescriptor.event || eventName;
    propName = bindingDescriptor.prop || propName;
  }

  return {
    propName: propName,
    eventName: eventName
  };
};

var getInstanceBindingDescriptor = function getInstanceBindingDescriptor(instance) {
  var _instance$constructor = instance.constructor.bindingDescriptor,
      bindingDescriptor = _instance$constructor === void 0 ? {} : _instance$constructor;
  var _bindingDescriptor$pr = bindingDescriptor.prop,
      propName = _bindingDescriptor$pr === void 0 ? 'value' : _bindingDescriptor$pr,
      _bindingDescriptor$ev = bindingDescriptor.event,
      eventName = _bindingDescriptor$ev === void 0 ? 'onChange' : _bindingDescriptor$ev;
  return {
    propName: propName,
    eventName: eventName
  };
};

var binding = function binding(element, value, self, space) {
  var _React$cloneElement;

  for (var _len = arguments.length, path = new Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    path[_key - 4] = arguments[_key];
  }

  var props = element.props;

  var _getBindingDescriptor = getBindingDescriptor(element),
      propName = _getBindingDescriptor.propName,
      eventName = _getBindingDescriptor.eventName;

  var selfListener = props[eventName];
  return _react.default.cloneElement(element, (_React$cloneElement = {}, (0, _defineProperty2.default)(_React$cloneElement, eventName, function (e) {
    if (space === 'state') {
      setState(self, e, path);
    }

    if (space === 'props') {
      setProps(self, e, path);
    }

    selfListener && selfListener(e);
  }), (0, _defineProperty2.default)(_React$cloneElement, propName, value), _React$cloneElement));
};

var _default = binding;
exports.default = _default;
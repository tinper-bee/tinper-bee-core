"use strict";

exports.__esModule = true;

var _entries = require("babel-runtime/core-js/object/entries");

var _entries2 = _interopRequireDefault(_entries);

exports.default = splitComponentProps;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 分割要传入父元素和子元素的props
 * @param  {[object]} props     传入的属性
 * @param  {[reactElement]} Component 组件
 * @return {[array]}           返回数组，第一个元素为父元素props对象，第二个子元素props对象
 */
function splitComponentProps(props, Component) {
  var componentPropTypes = Component.propTypes;

  var parentProps = {};
  var childProps = {};

  (0, _entries2.default)(props).forEach(function (_ref) {
    var propName = _ref[0],
        propValue = _ref[1];

    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });

  return [parentProps, childProps];
}
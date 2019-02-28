"use strict";

exports.__esModule = true;
exports.default = splitComponentProps;
/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
function _objectEntries(obj) {
  var entries = [];
  var keys = Object.keys(obj);

  for (var k = 0; k < keys.length; ++k) {
    entries.push([keys[k], obj[keys[k]]]);
  }return entries;
}

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

  _objectEntries(props).forEach(function (_ref) {
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
/**
 * 分割要传入父元素和子元素的props
 * @param  {[object]} props     传入的属性
 * @param  {[reactElement]} Component 组件
 * @return {[array]}           返回数组，第一个元素为父元素props对象，第二个子元素props对象
 */
export default function splitComponentProps(props, Component) {
  const componentPropTypes = Component.propTypes;

  const parentProps = {};
  const childProps = {};

  Object.entries(props).forEach(([propName, propValue]) => {
    if (componentPropTypes[propName]) {
      parentProps[propName] = propValue;
    } else {
      childProps[propName] = propValue;
    }
  });

  return [parentProps, childProps];
}

/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
export default function contains(root, n) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
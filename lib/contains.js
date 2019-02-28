"use strict";

exports.__esModule = true;
exports.default = contains;
/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
function contains(root, n) {
  var node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
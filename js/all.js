/**
 * This source code is quoted from rc-util.
 * homepage: https://github.com/react-component/util
 */
import createChainableTypeChecker from './utils/createChainableTypeChecker';

export default function all(...validators) {
  function allPropTypes(...args) {
    let error = null;

    validators.forEach(validator => {
      if (error != null) {
        return;
      }

      const result = validator(...args);
      if (result != null) {
        error = result;
      }
    });

    return error;
  }

  return createChainableTypeChecker(allPropTypes);
}

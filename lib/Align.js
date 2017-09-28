'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _domAlign = require('dom-align');

var _domAlign2 = _interopRequireDefault(_domAlign);

var _addEventListener = require('./addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import isWindow from './isWindow';

function isWindow(obj) {
  /* eslint no-eq-null: 0 */
  /* eslint eqeqeq: 0 */
  return obj != null && obj == obj.window;
}

function buffer(fn, ms) {
  var timer = void 0;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  function bufferFn() {
    clear();
    timer = setTimeout(fn, ms);
  }

  bufferFn.clear = clear;

  return bufferFn;
}
var propTypes = {
  childrenProps: _propTypes2.default.object,
  align: _propTypes2.default.object.isRequired,
  target: _propTypes2.default.func,
  onAlign: _propTypes2.default.func,
  monitorBufferTime: _propTypes2.default.number,
  monitorWindowResize: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  children: _propTypes2.default.any
};

var defaultProps = {
  target: function target() {
    return window;
  },
  onAlign: function onAlign() {},

  monitorBufferTime: 50,
  monitorWindowResize: false,
  disabled: false
};

var Align = function (_React$Component) {
  _inherits(Align, _React$Component);

  function Align(props) {
    _classCallCheck(this, Align);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _initialiseProps.call(_this);

    return _this;
  }

  Align.prototype.componentDidMount = function componentDidMount() {
    var props = this.props;
    // if parent ref not attached .... use document.getElementById
    this.forceAlign();
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize();
    }
  };

  Align.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var reAlign = false;
    var props = this.props;

    if (!props.disabled) {
      if (prevProps.disabled || prevProps.align !== props.align) {
        reAlign = true;
      } else {
        var lastTarget = prevProps.target();
        var currentTarget = props.target();
        if (isWindow(lastTarget) && isWindow(currentTarget)) {
          reAlign = false;
        } else if (lastTarget !== currentTarget) {
          reAlign = true;
        }
      }
    }

    if (reAlign) {
      this.forceAlign();
    }

    if (props.monitorWindowResize && !props.disabled) {
      this.startMonitorWindowResize();
    } else {
      this.stopMonitorWindowResize();
    }
  };

  Align.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stopMonitorWindowResize();
  };

  Align.prototype.startMonitorWindowResize = function startMonitorWindowResize() {
    if (!this.resizeHandler) {
      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
      this.resizeHandler = (0, _addEventListener2.default)(window, 'resize', this.bufferMonitor);
    }
  };

  Align.prototype.render = function render() {
    var _props = this.props,
        childrenProps = _props.childrenProps,
        children = _props.children;

    var child = _react2.default.Children.only(children);
    if (childrenProps) {
      var newProps = {};
      for (var prop in childrenProps) {
        if (childrenProps.hasOwnProperty(prop)) {
          newProps[prop] = this.props[childrenProps[prop]];
        }
      }
      return _react2.default.cloneElement(child, newProps);
    }
    return child;
  };

  return Align;
}(_react2.default.Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.stopMonitorWindowResize = function () {
    if (_this2.resizeHandler) {
      _this2.bufferMonitor.clear();
      _this2.resizeHandler.remove();
      _this2.resizeHandler = null;
    }
  };

  this.forceAlign = function () {
    var props = _this2.props;
    if (!props.disabled) {
      var source = _reactDom2.default.findDOMNode(_this2);
      props.onAlign(source, (0, _domAlign2.default)(source, props.target(), props.align));
    }
  };
};

;

Align.defaultProps = defaultProps;
Align.propTypes = propTypes;
exports.default = Align;
'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domAlign = require('dom-align');

var _domAlign2 = _interopRequireDefault(_domAlign);

var _addEventListener = require('./addEventListener');

var _addEventListener2 = _interopRequireDefault(_addEventListener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Align = _react2.default.createClass({
  propTypes: {
    childrenProps: _react.PropTypes.object,
    align: _react.PropTypes.object.isRequired,
    target: _react.PropTypes.func,
    onAlign: _react.PropTypes.func,
    monitorBufferTime: _react.PropTypes.number,
    monitorWindowResize: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool,
    children: _react.PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      target: function target() {
        return window;
      },
      onAlign: function onAlign() {},

      monitorBufferTime: 50,
      monitorWindowResize: false,
      disabled: false
    };
  },
  componentDidMount: function componentDidMount() {
    var props = this.props;
    // if parent ref not attached .... use document.getElementById
    this.forceAlign();
    if (!props.disabled && props.monitorWindowResize) {
      this.startMonitorWindowResize();
    }
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
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
  },
  componentWillUnmount: function componentWillUnmount() {
    this.stopMonitorWindowResize();
  },
  startMonitorWindowResize: function startMonitorWindowResize() {
    if (!this.resizeHandler) {
      this.bufferMonitor = buffer(this.forceAlign, this.props.monitorBufferTime);
      this.resizeHandler = (0, _addEventListener2.default)(window, 'resize', this.bufferMonitor);
    }
  },
  stopMonitorWindowResize: function stopMonitorWindowResize() {
    if (this.resizeHandler) {
      this.bufferMonitor.clear();
      this.resizeHandler.remove();
      this.resizeHandler = null;
    }
  },
  forceAlign: function forceAlign() {
    var props = this.props;
    if (!props.disabled) {
      var source = _reactDom2.default.findDOMNode(this);
      props.onAlign(source, (0, _domAlign2.default)(source, props.target(), props.align));
    }
  },
  render: function render() {
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
  }
});

exports.default = Align;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Touch = function (_React$Component) {
  _inherits(Touch, _React$Component);

  function Touch(props) {
    _classCallCheck(this, Touch);

    var _this = _possibleConstructorReturn(this, (Touch.__proto__ || Object.getPrototypeOf(Touch)).call(this, props));

    _this.state = {
      start: null,
      x: null,
      y: null,
      swiping: false
    };

    _this.handleTouchStart = _this.handleTouchStart.bind(_this);
    _this.handleTouchMove = _this.handleTouchMove.bind(_this);
    _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
    return _this;
  }

  _createClass(Touch, [{
    key: 'getGestureDetails',
    value: function getGestureDetails(e) {
      var _e$changedTouches$ = e.changedTouches[0];
      var clientX = _e$changedTouches$.clientX;
      var clientY = _e$changedTouches$.clientY;

      var deltaX = this.state.x - clientX;
      var deltaY = this.state.y - clientY;
      var absX = Math.abs(deltaX);
      var absY = Math.abs(deltaY);
      return { deltaX: deltaX, deltaY: deltaY, absX: absX, absY: absY };
    }
  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.setState({
        start: Date.now(),
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        swiping: false
      });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      var ge = this.getGestureDetails(e);
      if (ge.absX > this.props.swipeThreshold || ge.absY > this.props.swipeThreshold) {
        this.handleSwipeGesture(ge);
        return;
      }
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      var ge = this.getGestureDetails(e);
      if (this.state.swiping) {
        this.props['onSwipe' + this.state.direction](ge);
      } else {
        this.props.onTouch(ge);
      }

      this.setState({
        start: null,
        x: null,
        y: null,
        swiping: false
      });
    }
  }, {
    key: 'isVerticalGesture',
    value: function isVerticalGesture(delta) {
      return delta > 0 ? 'Up' : 'Down';
    }
  }, {
    key: 'isHorizontalGesture',
    value: function isHorizontalGesture(delta) {
      return delta < 0 ? 'Right' : 'Left';
    }
  }, {
    key: 'handleSwipeGesture',
    value: function handleSwipeGesture(ge) {
      var deltaX = ge.deltaX;
      var absX = ge.absX;
      var deltaY = ge.deltaY;
      var absY = ge.absY;

      var direction = absX > absY ? this.isHorizontalGesture(deltaX) : this.isVerticalGesture(deltaY);

      this.setState({
        direction: direction,
        swiping: true
      }, this.props.onDrag.bind(ge));
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        {
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd
        },
        this.props.children
      );
    }
  }]);

  return Touch;
}(_react2.default.Component);

exports.default = Touch;


Touch.propTypes = {
  children: _react2.default.PropTypes.any.isRequired,
  swipeThreshold: _react2.default.PropTypes.number,
  onSwipeRight: _react2.default.PropTypes.func,
  onSwipeLeft: _react2.default.PropTypes.func,
  onSwipeUp: _react2.default.PropTypes.func,
  onSwipeDown: _react2.default.PropTypes.func,
  onDrag: _react2.default.PropTypes.func,
  onTouch: _react2.default.PropTypes.func
};
Touch.defaultProps = {
  swipeThreshold: 40,

  onSwipeLeft: function onSwipeLeft() {},
  onSwipeRight: function onSwipeRight() {},
  onSwipeUp: function onSwipeUp() {},
  onSwipeDown: function onSwipeDown() {},
  onDrag: function onDrag() {},
  onTouch: function onTouch() {}
};
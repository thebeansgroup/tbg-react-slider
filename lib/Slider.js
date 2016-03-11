'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Touch = require('./Touch');

var _Touch2 = _interopRequireDefault(_Touch);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

var _Transitions = require('./Transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This line ensures compatibility back to react 0.13
var findDOMNode = _reactDom2.default.findDOMNode || _react2.default.findDOMNode;

var Slider = function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props) {
    _classCallCheck(this, Slider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this, props));

    _this.state = {
      activeItem: _this.props.initialSlide,
      lastItem: _this.props.initialSlide,
      active: true,
      viewport: {
        active: {},
        last: {}
      }
    };

    _this.delayInterval = null;
    _this.transitionTimeout = null;
    return _this;
  }

  _createClass(Slider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.onShow(this.state.activeItem);

      if (this.props.autoplay) {
        this.start();
      }
    }
  }, {
    key: 'getViewportDimensions',
    value: function getViewportDimensions() {
      return {
        active: findDOMNode(this.refs.viewport_active).getBoundingClientRect(),
        last: findDOMNode(this.refs.viewport_last).getBoundingClientRect()
      };
    }
  }, {
    key: 'getDotActiveClass',
    value: function getDotActiveClass(i) {
      return i === this.state.activeItem ? 'is-active' : '';
    }
  }, {
    key: 'getActiveStyle',
    value: function getActiveStyle() {
      if (!this.state.active) {
        return Object.assign(this.props.transition.end(this.state.direction, this.state.viewport.active), this.props.transition.transition(this.props.transitionTime));
      }
      return this.props.transition.start(this.state.direction, this.state.viewport.active);
    }
  }, {
    key: 'getLastStyle',
    value: function getLastStyle() {
      if (!this.state.active) {
        return Object.assign(this.props.transition.prevEnd(this.state.direction, this.state.viewport.last), this.props.transition.transition(this.props.transitionTime), _Style2.default.lastView);
      }
      return Object.assign(this.props.transition.prevStart(this.state.direction, this.state.viewport.last), _Style2.default.lastView);
    }
  }, {
    key: 'getNextItem',
    value: function getNextItem(dir) {
      var direction = dir === 'left' ? -1 : 1;
      this.setState({ direction: direction });
      return this.state.activeItem + direction;
    }
  }, {
    key: 'setActive',
    value: function setActive(active) {
      clearTimeout(this.transitionTimeout);
      this.setState({ active: active });
    }
  }, {
    key: 'start',
    value: function start() {
      this.stop();
      this.delayInterval = setInterval(this.incrementActiveItem.bind(this), this.props.delay);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(this.delayInterval);
    }
  }, {
    key: 'next',
    value: function next() {
      this.handleArrowClick('right');
    }
  }, {
    key: 'prev',
    value: function prev() {
      this.handleArrowClick('left');
    }
  }, {
    key: 'goto',
    value: function goto(index) {
      this.stop();
      this.findItemDirection(index);
      this.gotoSlide(index);
      if (this.props.autoplay) {
        this.start();
      }
    }
  }, {
    key: 'findItemDirection',
    value: function findItemDirection(index) {
      var direction = index < this.state.activeItem ? -1 : 1;
      this.setState({ direction: direction });
    }
  }, {
    key: 'endTransition',
    value: function endTransition() {
      this.transitionTimeout = setTimeout(this.setActive.bind(this, false), 30);
      this.props.onChange();
      this.props.onShow(this.state.activeItem);
    }
  }, {
    key: 'incrementActiveItem',
    value: function incrementActiveItem() {
      var dir = arguments.length <= 0 || arguments[0] === undefined ? this.props.direction : arguments[0];

      var activeItem = this.getNextItem(dir);
      if (activeItem > this.props.children.length - 1) {
        activeItem = 0;
      }
      if (activeItem < 0) {
        activeItem = this.props.children.length - 1;
      }
      this.gotoSlide(activeItem);
    }
  }, {
    key: 'gotoSlide',
    value: function gotoSlide(activeItem) {
      var viewport = this.getViewportDimensions();

      this.setActive(true);
      this.setState({
        lastItem: this.state.activeItem,
        activeItem: activeItem,
        viewport: viewport
      }, this.endTransition.bind(this));
    }
  }, {
    key: 'handleArrowClick',
    value: function handleArrowClick(direction) {
      this.stop();
      this.incrementActiveItem(direction);
      if (this.props.autoplay) {
        this.start();
      }
    }
  }, {
    key: 'renderDot',
    value: function renderDot(child, i) {
      return _react2.default.createElement(
        'span',
        {
          onClick: this.goto.bind(this, i),
          key: 'dot_' + i,
          className: this.props.className + '__dot ' + this.getDotActiveClass(i)
        },
        ' ',
        this.props.dot,
        ' '
      );
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      if (!this.props.dots) {
        return null;
      }
      return this.props.children.map(this.renderDot.bind(this));
    }
  }, {
    key: 'renderNavArrow',
    value: function renderNavArrow(dir) {
      if (!this.props.arrows) {
        return null;
      }
      return _react2.default.createElement(
        'div',
        {
          onClick: this.handleArrowClick.bind(this, dir),
          style: _Style2.default['nav__' + dir],
          className: this.props.className + '__arrow ' + this.props.className + '__arrow--' + dir
        },
        this.props.arrow[dir]
      );
    }
  }, {
    key: 'renderLastView',
    value: function renderLastView() {
      return _react2.default.createElement(
        'section',
        {
          ref: 'viewport_last',
          style: this.getLastStyle(),
          className: this.props.className + '__view'
        },
        this.props.children[this.state.lastItem]
      );
    }
  }, {
    key: 'renderActiveView',
    value: function renderActiveView() {
      return _react2.default.createElement(
        'section',
        {
          ref: 'viewport_active',
          style: this.getActiveStyle(),
          className: this.props.className + '__view'
        },
        this.props.children[this.state.activeItem]
      );
    }
  }, {
    key: 'renderSlideView',
    value: function renderSlideView() {
      return _react2.default.createElement(
        'section',
        { className: this.props.className + '__wrapper', style: _Style2.default.wrapper },
        this.renderActiveView(),
        this.renderLastView()
      );
    }
  }, {
    key: 'renderSlides',
    value: function renderSlides() {
      if (!this.props.touchGestures) {
        return this.renderSlideView();
      }
      return _react2.default.createElement(
        _Touch2.default,
        {
          onSwipeLeft: this.next.bind(this),
          onSwipeRight: this.prev.bind(this)
        },
        this.renderSlideView()
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: _Style2.default.slider },
        this.renderSlides(),
        this.renderNavArrow('left'),
        this.renderNavArrow('right'),
        _react2.default.createElement(
          'section',
          { className: this.props.className + '__dots', style: _Style2.default.dots },
          this.renderDots()
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component);

exports.default = Slider;


Slider.propTypes = {
  arrows: _react2.default.PropTypes.bool,
  autoplay: _react2.default.PropTypes.bool,
  children: _react2.default.PropTypes.any.isRequired,
  className: _react2.default.PropTypes.string,
  delay: _react2.default.PropTypes.number,
  direction: _react2.default.PropTypes.string,
  dots: _react2.default.PropTypes.bool,
  initialSlide: _react2.default.PropTypes.number,
  touchGestures: _react2.default.PropTypes.bool,
  transition: _react2.default.PropTypes.any,
  transitionTime: _react2.default.PropTypes.number,

  onChange: _react2.default.PropTypes.func,
  onShow: _react2.default.PropTypes.func,

  dot: _react2.default.PropTypes.element,
  arrow: _react2.default.PropTypes.object
};

Slider.defaultProps = {
  arrows: true,
  autoplay: true,
  className: 'slider',
  delay: 5000,
  direction: 'right',
  dots: false,
  initialSlide: 0,
  touchGestures: true,
  transition: _Transitions.Fade,
  transitionTime: 0.5,

  onChange: function onChange() {},
  onShow: function onShow() {},

  dot: _react2.default.createElement(
    'span',
    null,
    '•'
  ),
  arrow: {
    left: _react2.default.createElement(
      'span',
      null,
      '‹'
    ),
    right: _react2.default.createElement(
      'span',
      null,
      '›'
    )
  }
};
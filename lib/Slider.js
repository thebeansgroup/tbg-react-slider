'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Style = require('./Style');

var _Style2 = _interopRequireDefault(_Style);

var _Transitions = require('./Transitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// This line ensures compatibility back to react 0.13
var findDOMNode = _reactDom2.default.findDOMNode || _react2.default.findDOMNode;

var delayInterval = null;
var transitionTimeout = null;

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
    var Transition = _this.props.transition;

    _this.transition = new Transition();
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
    key: 'getActiveStyle',
    value: function getActiveStyle() {
      if (!this.state.active) {
        return Object.assign(this.transition.end(this.state.direction, this.state.viewport.active), this.transition.transition(this.props.transitionTime));
      }
      return this.transition.start(this.state.direction, this.state.viewport.active);
    }
  }, {
    key: 'getLastStyle',
    value: function getLastStyle() {
      if (!this.state.active) {
        return Object.assign(this.transition.prevEnd(this.state.direction, this.state.viewport.last), this.transition.transition(this.props.transitionTime), _Style2.default.lastView);
      }
      return Object.assign(this.transition.prevStart(this.state.direction, this.state.viewport.last), _Style2.default.lastView);
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
      this.setState({ active: active });
    }
  }, {
    key: 'nextSlide',
    value: function nextSlide() {
      this.getNextItem('right');
    }
  }, {
    key: 'previousSlide',
    value: function previousSlide() {
      this.getNextItem('left');
    }
  }, {
    key: 'start',
    value: function start() {
      delayInterval = setInterval(this.incrementActiveItem.bind(this), this.props.delay);
    }
  }, {
    key: 'stop',
    value: function stop() {
      clearInterval(delayInterval);
    }
  }, {
    key: 'endTransition',
    value: function endTransition() {
      transitionTimeout = setTimeout(this.setActive.bind(this, false), 30);
      this.props.onChange();
      this.props.onShow(this.state.activeItem);
    }

    // refactor

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

      this.gotoNextSlide(activeItem);
    }
  }, {
    key: 'gotoNextSlide',
    value: function gotoNextSlide(activeItem) {
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
    key: 'handleDotClick',
    value: function handleDotClick(index) {
      this.stop();
      this.gotoNextSlide(index);
      if (this.props.autoplay) {
        this.start();
      }
    }

    // this is all sorts of dodge

  }, {
    key: 'renderDots',
    value: function renderDots() {
      var _this2 = this;

      if (!this.props.dots) {
        return null;
      }
      return this.props.children.map(function (child, i) {
        var mod = i === _this2.state.activeItem ? '' : 'slider__dot--active';
        return _react2.default.createElement(
          'span',
          {
            onClick: _this2.handleDotClick.bind(_this2, i),
            key: 'dot_' + i,
            className: 'slider__dot ' + mod,
            style: { color: color }
          },
          ' ',
          _this2.props.dot,
          ' '
        );
      });
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
          className: 'slider__arrow slider__arrow--' + dir,
          style: _Style2.default['nav__' + dir]
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
          className: 'slider__view',
          style: this.getLastStyle()
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
          className: 'slider__view',
          style: this.getActiveStyle()
        },
        this.props.children[this.state.activeItem]
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: this.props.className, style: _Style2.default.slider },
        _react2.default.createElement(
          'section',
          { style: _Style2.default.wrapper },
          this.renderActiveView(),
          this.renderLastView()
        ),
        this.renderNavArrow('left'),
        this.renderNavArrow('right'),
        _react2.default.createElement(
          'section',
          { className: 'slider__dots', style: _Style2.default.dots },
          this.renderDots()
        )
      );
    }
  }]);

  return Slider;
}(_react2.default.Component);

exports.default = Slider;


Slider.propTypes = {
  onChange: _react2.default.PropTypes.func,
  onShow: _react2.default.PropTypes.func,
  initialSlide: _react2.default.PropTypes.number,
  autoplay: _react2.default.PropTypes.bool,
  arrows: _react2.default.PropTypes.bool,
  dots: _react2.default.PropTypes.bool,
  delay: _react2.default.PropTypes.number,
  transitionTime: _react2.default.PropTypes.number,
  direction: _react2.default.PropTypes.string,
  className: _react2.default.PropTypes.string,
  transitionType: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.any.isRequired,
  dot: _react2.default.PropTypes.element,
  arrow: _react2.default.PropTypes.object,
  transition: _react2.default.PropTypes.any
};

Slider.defaultProps = {
  onChange: function onChange() {},
  onShow: function onShow() {},
  delay: 5000,
  autoplay: true,
  initialSlide: 0,
  arrows: true,
  dots: true,
  direction: 'right',
  transitionTime: 0.5,
  className: 'slider',
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
  },
  transition: _Transitions.Fade
};
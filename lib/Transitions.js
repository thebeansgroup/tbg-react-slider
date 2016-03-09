'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Transition = function () {
  function Transition() {
    _classCallCheck(this, Transition);
  }

  _createClass(Transition, [{
    key: 'start',
    value: function start() {
      return {};
    }
  }, {
    key: 'end',
    value: function end() {
      return {};
    }
  }, {
    key: 'prevStart',
    value: function prevStart() {
      return {};
    }
  }, {
    key: 'prevEnd',
    value: function prevEnd() {
      return {};
    }
  }, {
    key: 'transition',
    value: function transition() {
      return {};
    }
  }]);

  return Transition;
}();

// Basic Fade transition


var Fade = function (_Transition) {
  _inherits(Fade, _Transition);

  function Fade() {
    _classCallCheck(this, Fade);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Fade).apply(this, arguments));
  }

  _createClass(Fade, [{
    key: 'start',
    value: function start() {
      return { opacity: '0' };
    }
  }, {
    key: 'end',
    value: function end() {
      return { opacity: '1' };
    }
  }, {
    key: 'transition',
    value: function transition(time) {
      return { transition: 'opacity ' + time + 's' };
    }
  }]);

  return Fade;
}(Transition);

// Basic Slide Transition


var Slide = function (_Transition2) {
  _inherits(Slide, _Transition2);

  function Slide() {
    _classCallCheck(this, Slide);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Slide).apply(this, arguments));
  }

  _createClass(Slide, [{
    key: 'start',
    value: function start(dir, view) {
      return { transform: 'translateX(' + view.width * dir + 'px)' };
    }
  }, {
    key: 'end',
    value: function end() {
      return { transform: 'translateX(0)' };
    }
  }, {
    key: 'prevStart',
    value: function prevStart() {
      return { transform: 'translateX(0)' };
    }
  }, {
    key: 'prevEnd',
    value: function prevEnd(dir, view) {
      return { transform: 'translateX(' + view.width * (dir * -1) + 'px)' };
    }
  }, {
    key: 'transition',
    value: function transition(time) {
      return { transition: 'transform ' + time + 's' };
    }
  }]);

  return Slide;
}(Transition);

// Slide Down Transition


var SlideDown = function (_Transition3) {
  _inherits(SlideDown, _Transition3);

  function SlideDown() {
    _classCallCheck(this, SlideDown);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(SlideDown).apply(this, arguments));
  }

  _createClass(SlideDown, [{
    key: 'start',
    value: function start(dir, view) {
      return { transform: 'translateY(' + view.height * (dir * -1) + 'px)' };
    }
  }, {
    key: 'end',
    value: function end() {
      return { transform: 'translateY(0)' };
    }
  }, {
    key: 'prevStart',
    value: function prevStart() {
      return { transform: 'translateY(0)' };
    }
  }, {
    key: 'prevEnd',
    value: function prevEnd(dir, view) {
      return { transform: 'translateY(' + view.height * dir + 'px)' };
    }
  }, {
    key: 'transition',
    value: function transition(time) {
      return {
        transition: 'transform ' + time + 's'
      };
    }
  }]);

  return SlideDown;
}(Transition);

exports.default = {
  Transition: Transition,
  Fade: Fade,
  Slide: Slide,
  SlideDown: SlideDown
};
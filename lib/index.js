'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Transitions = exports.default = undefined;

var _Slider = require('./Slider.js');

var _Slider2 = _interopRequireDefault(_Slider);

var _Transitions = require('./Transitions.js');

var Transitions = _interopRequireWildcard(_Transitions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Slider2.default;
exports.Transitions = Transitions;
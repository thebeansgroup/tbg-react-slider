'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Base = exports.Base = {
  start: function start() {
    return {};
  },
  end: function end() {
    return {};
  },
  prevStart: function prevStart() {
    return {};
  },
  prevEnd: function prevEnd() {
    return {};
  },
  transition: function transition() {
    return {};
  }
};

var create = exports.create = function create(transition) {
  return Object.assign({}, Base, transition);
};

// Basic Fade transition
var Fade = exports.Fade = create({
  start: function start() {
    return { opacity: '0' };
  },
  end: function end() {
    return { opacity: '1' };
  },
  transition: function transition(time) {
    return { transition: 'opacity ' + time + 's' };
  }
});

// Basic Slide Transition
var Slide = exports.Slide = create({
  start: function start(dir, view) {
    return { transform: 'translateX(' + view.width * dir + 'px)' };
  },
  end: function end() {
    return { transform: 'translateX(0)' };
  },
  prevStart: function prevStart() {
    return { transform: 'translateX(0)' };
  },
  prevEnd: function prevEnd(dir, view) {
    return { transform: 'translateX(' + view.width * (dir * -1) + 'px)' };
  },
  transition: function transition(time) {
    return { transition: 'transform ' + time + 's' };
  }
});

// Slide Down Transition
var SlideDown = exports.SlideDown = create({
  start: function start(dir, view) {
    return { transform: 'translateY(' + view.height * (dir * -1) + 'px)' };
  },
  end: function end() {
    return { transform: 'translateY(0)' };
  },
  prevStart: function prevStart() {
    return { transform: 'translateY(0)' };
  },
  prevEnd: function prevEnd(dir, view) {
    return { transform: 'translateY(' + view.height * dir + 'px)' };
  },
  transition: function transition(time) {
    return {
      transition: 'transform ' + time + 's'
    };
  }
});
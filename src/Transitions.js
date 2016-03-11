export const Base = {
  start() { return {}; },
  end() { return {}; },
  prevStart() { return {}; },
  prevEnd() { return {}; },
  transition() { return {}; },
};

export const create = (transition) => Object.assign({}, Base, transition);

// Basic Fade transition
export const Fade = create({
  start() {
    return { opacity: '0' };
  },
  end() {
    return { opacity: '1' };
  },
  transition(time) {
    return { transition: `opacity ${time}s` };
  },
});

// Basic Slide Transition
export const Slide = create({
  start(dir, view) {
    return { transform: `translateX(${view.width * dir}px)` };
  },
  end() {
    return { transform: 'translateX(0)' };
  },
  prevStart() {
    return { transform: 'translateX(0)' };
  },
  prevEnd(dir, view) {
    return { transform: `translateX(${view.width * (dir * -1)}px)` };
  },
  transition(time) {
    return { transition: `transform ${time}s` };
  },
});

// Slide Down Transition
export const SlideDown = create({
  start(dir, view) {
    return { transform: `translateY(${view.height * (dir * -1)}px)` };
  },
  end() {
    return { transform: 'translateY(0)' };
  },
  prevStart() {
    return { transform: 'translateY(0)' };
  },
  prevEnd(dir, view) {
    return { transform: `translateY(${view.height * dir}px)` };
  },
  transition(time) {
    return {
      transition: `transform ${time}s`,
    };
  },
});

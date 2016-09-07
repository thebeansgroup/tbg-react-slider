# TBG-React-Slider

Pure JS React image slider component with no CSS dependencies

[![npm version](https://badge.fury.io/js/tbg-react-slider.svg)](https://badge.fury.io/js/tbg-react-slider)

## Installation

### Installing
The simplest way to use TBG-React-Slider is to grab it from NPM and include it in your build process.
```
npm install tbg-react-slider --save
```

### Imports

TBG-React-Slider is packaged as an es6 module, so to import it use

```
import Slider from 'tbg-react-slider'
```

or to use it as a CommonJS module:
```
const TBGReactSlider = require('tbg-react-slider').default
```

## Usage

### Basic usage

To use TBG-React-Slider at its most basic form

```
import React from 'react';
import ReactDOM from 'react-dom';

import Slider from 'tbg-react-slider';

ReactDOM.render(
  <Slider>
    <div> Slide 1 </div>
    <div> Slide 2 </div>
    <div> Slide 3 </div>
    <div> Slide 4 </div>
  </Slider>
  ,
  document.getElementById('carousel')
);
```
### Props

#### Default Props

```
className: 'slider'
arrows: true
dots: true
delay: 5000
autoplay: true
initialSlide: 0
direction: 'right'
transitionTime: 0.5
transition: Fade

onChange: () => { }
onShow: () => { }

dot: <span>&#8226;</span>
arrow: {
  left: <span>&#8249;</span>,
  right: <span>&#8250;</span>,
}
```

### Styling

TBG-React-Slider doesn't depend on any external styles for functionality. However, it can be styled for UI and follows __BEM__ principles.

The default Block class is `.slider` and can be changed via passing a `className` string as a component prop.

Available styles based on the default Block `.slider` class:
```
.slider {}
.slider__wrapper {}
.slider__view {}
.slider__dots {}
.slider__dot {}
.slider__dot.is-active {}
.slider__arrow__wrapper {}
.slider__arrow__wrapper--right {}
.slider__arrow__wrapper--left {}
.slider__arrow {}
.slider__arrow--right {}
.slider__arrow--left {}
```

### Exposed component functions

TBG-React-Slider has some exposed component functions which can be used to navigate slides - `start()`, `stop()`, `next()`, `prev()` & `goto(index)`

To access these, add a `ref` to the component `<Slider ref="slider" ...` and they can then be referenced via `this.refs.slider.next()`

[React Documentation](https://facebook.github.io/react/tips/expose-component-functions.html)
### Outdated - I've added touch capabilities to the slider component...
#### Updated README to follow
__Example using [react-hammerjs](https://github.com/JedWatson/react-hammerjs)__
```
import Slider, { Transitions } from 'tbg-react-slider';
import Hammer from 'react-hammerjs';

class HammerJSExample extends React.Component {
  handleSwipe(e) {
    const dir = e.direction;
    if (dir === 2) { this.refs.slider.nextSlide(); }
    if (dir === 4) { this.refs.slider.previousSlide(); }
  }

  ...

  render() {
    return (
      <Hammer onSwipe={ this.handleSwipe.bind(this) }>
        <Slider ref="slider" transition={ Transitions.Slide } >
          ...
        </Slider>
      </Hammer>
    );
  }
}
```

## Transitions
### Pre-Packed Transitions
TBG-React-Slider comes with a couple of pre-packed transitions which can be imported and passed as props to the slider component.

By default the `Fade` transition is used.

```
import Slider, { Transitions } from 'tbg-react-slider';

<Slider transition={ Transitions.Slide } >
  ...
</Slider>

```

Packed transitions include: `Fade`, `Slide`, `SlideDown`

### Custom Transitions
To create a custom transition you can `create` method in `Transitions`
```
import Slider, { Transitions } from 'tbg-react-slider';

const Spin = Transitions.create({
  start(dir, view) {
    return {
      transform: `
        translate(${view.width * dir}px, ${view.height * dir}px)
        rotateZ(360deg)
      `,
    };
  },
  end() {
    return {
      transform: 'translateX(0) rotateZ(0)',
    };
  },
  transition(time) {
    return {
      transition: `transform ${time}s`,
    };
  },
});



<Slider transition={ Spin } >
  ...
</Slider>
```

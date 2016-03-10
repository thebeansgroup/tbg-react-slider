# TBG-React-Slider
Pure JS React image slider component with no CSS dependencies

## Installation

### Installing
The simplest way to use TBG-React-Slider is to grab it from NPM and include it in your build process.
```
npm install tbg-react-slider --save
```

### Importing

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

### Exposed component functions

`tbg-react-slider` has 3 exposed methods which can be used to navigate slides `nextSlide()`, `previousSlide()` & `gotoSlide(index)`

To access these, add a `ref` to the component `<Slider ref="slider" ...` and they can then be referenced via `this.refs.slider.nextSlide()`

[React Documentation](https://facebook.github.io/react/tips/expose-component-functions.html)

Example using [react-hammerjs](https://github.com/JedWatson/react-hammerjs)
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
`tbg-react-slider` comes with a couple of pre-packed transitions which can be imported and passed as props to the slider component.

By default the `Fade` transition is used.

```
import Slider, { Transitions } from 'tbg-react-slider';

<Slider transition={ Transitions.Slide } >
  ...
</Slider>

```

Packed transitions include: `Fade`, `Slide`, `SlideDown`

### Custom Transitions
To create a custom transition you can `extend` from `Transitions.Base`
```
import Slider, { Transitions } from 'tbg-react-slider';

// Spin Transition
class Spin extends Transitions.Base {
  start(dir, view) {
    return {
      transform: `
        translate(${view.width * dir}px, ${view.height * dir}px)
        rotateZ(360deg)
      `,
    };
  }
  end() {
    return {
      transform: 'translateX(0) rotateZ(0)',
    };
  }
  transition(time) {
    return {
      transition: `transform ${time}s`,
    };
  }
}



<Slider transition={ Spin } >
  ...
</Slider>
```

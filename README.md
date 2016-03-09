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

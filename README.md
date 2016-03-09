
### Pre-Packed Transitions
Slider comes with a couple of pre-packed transitions which can be imported and passed as props to the slider component.

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

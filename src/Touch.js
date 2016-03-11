import React from 'react';

export default class Touch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: null,
      x: null,
      y: null,
      swiping: false,
    };

    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
  }

  getGestureDetails(e) {
    const { clientX, clientY } = e.changedTouches[0];
    const deltaX = this.state.x - clientX;
    const deltaY = this.state.y - clientY;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    return { deltaX, deltaY, absX, absY };
  }

  handleTouchStart(e) {
    this.setState({
      start: Date.now(),
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      swiping: false,
    });
  }

  handleTouchMove(e) {
    const ge = this.getGestureDetails(e);
    if (ge.absX > this.props.swipeThreshold ||
        ge.absY > this.props.swipeThreshold) {
      this.handleSwipeGesture(ge);
      return;
    }
  }

  handleTouchEnd(e) {
    const ge = this.getGestureDetails(e);
    if (this.state.swiping) {
      this.props[`onSwipe${this.state.direction}`](ge);
    } else {
      this.props.onTouch(ge);
    }

    this.setState({
      start: null,
      x: null,
      y: null,
      swiping: false,
    });
  }

  isVerticalGesture(delta) {
    return delta > 0 ? 'Up' : 'Down';
  }
  isHorizontalGesture(delta) {
    return delta < 0 ? 'Right' : 'Left';
  }

  handleSwipeGesture(ge) {
    const { deltaX, absX, deltaY, absY } = ge;
    const direction = (absX > absY)
      ? this.isHorizontalGesture(deltaX)
      : this.isVerticalGesture(deltaY);

    this.setState({
      direction,
      swiping: true,
    }, this.props.onDrag.bind(ge));
  }


  render() {
    return (
      <div
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        { this.props.children }
      </div>
    );
  }
}

Touch.propTypes = {
  children: React.PropTypes.any.isRequired,
  swipeThreshold: React.PropTypes.number,
  onSwipeRight: React.PropTypes.func,
  onSwipeLeft: React.PropTypes.func,
  onSwipeUp: React.PropTypes.func,
  onSwipeDown: React.PropTypes.func,
  onDrag: React.PropTypes.func,
  onTouch: React.PropTypes.func,
};
Touch.defaultProps = {
  swipeThreshold: 40,

  onSwipeLeft: () => {},
  onSwipeRight: () => {},
  onSwipeUp: () => {},
  onSwipeDown: () => {},
  onDrag: () => {},
  onTouch: () => {},
};

import React from 'react';
import ReactDOM from 'react-dom';
import Touch from './Touch';
import style from './Style';
import { Fade } from './Transitions';
import assign from 'object-assign';

// This line ensures compatibility back to react 0.13
const findDOMNode = ReactDOM.findDOMNode || React.findDOMNode;

export default class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.initialSlide,
      lastItem: this.props.initialSlide,
      active: true,
      viewport: {
        active: {},
        last: {},
      },
    };

    this.delayInterval = null;
    this.transitionTimeout = null;
  }

  componentDidMount() {
    this.props.onShow(this.state.activeItem);

    if (this.props.autoplay) {
      this.start();
    }
  }

  getViewportDimensions() {
    return {
      active: findDOMNode(this.refs.viewport_active).getBoundingClientRect(),
      last: findDOMNode(this.refs.viewport_last).getBoundingClientRect(),
    };
  }

  getDotActiveClass(i) {
    return i === this.state.activeItem ? 'is-active' : '';
  }

  getActiveStyle() {
    if (!this.state.active) {
      return assign(
        this.props.transition.end(this.state.direction, this.state.viewport.active),
        this.props.transition.transition(this.props.transitionTime)
      );
    }
    return this.props.transition.start(this.state.direction, this.state.viewport.active);
  }

  getLastStyle() {
    if (!this.state.active) {
      return assign(
        this.props.transition.prevEnd(this.state.direction, this.state.viewport.last),
        this.props.transition.transition(this.props.transitionTime),
        style.lastView
      );
    }
    return assign(
      this.props.transition.prevStart(this.state.direction, this.state.viewport.last),
      style.lastView
    );
  }

  getNextItem(dir) {
    const direction = dir === 'left' ? -1 : 1;
    this.setState({ direction });
    return this.state.activeItem + direction;
  }

  setActive(active) {
    clearTimeout(this.transitionTimeout);
    this.setState({ active });
  }


  start() {
    this.stop();
    this.delayInterval = setInterval(
      this.incrementActiveItem.bind(this),
      this.props.delay
    );
  }

  stop() {
    clearInterval(this.delayInterval);
  }

  next() {
    this.handleArrowClick('right');
  }

  prev() {
    this.handleArrowClick('left');
  }

  goto(index) {
    this.stop();
    this.findItemDirection(index);
    this.gotoSlide(index);
    if (this.props.autoplay) { this.start(); }
  }

  findItemDirection(index) {
    const direction = index < this.state.activeItem ? -1 : 1;
    this.setState({ direction });
  }

  endTransition() {
    this.transitionTimeout = setTimeout(this.setActive.bind(this, false), 30);
    this.props.onChange();
    this.props.onShow(this.state.activeItem);
  }

  incrementActiveItem(dir = this.props.direction) {
    let activeItem = this.getNextItem(dir);
    if (activeItem > this.props.children.length - 1) {
      activeItem = 0;
    }
    if (activeItem < 0) {
      activeItem = this.props.children.length - 1;
    }
    this.gotoSlide(activeItem);
  }

  gotoSlide(activeItem) {
    const viewport = this.getViewportDimensions();

    this.setActive(true);
    this.setState({
      lastItem: this.state.activeItem,
      activeItem,
      viewport,
    }, this.endTransition.bind(this));
  }

  handleArrowClick(direction) {
    this.stop();
    this.incrementActiveItem(direction);
    if (this.props.autoplay) { this.start(); }
  }


  renderDot(child, i) {
    return (
      <span
        onClick={ this.goto.bind(this, i) }
        key={`dot_${i}`}
        className={`${this.props.className}__dot ${this.getDotActiveClass(i)}`}
      > { this.props.dot } </span>
    );
  }

  renderDots() {
    if (!this.props.dots) { return null; }
    return (
      this.props.children.map(this.renderDot.bind(this))
    );
  }

  renderNavArrow(dir) {
    if (!this.props.arrows) { return null; }
    return (
      <div
        onClick={ this.handleArrowClick.bind(this, dir) }
        style={ style[`nav__${dir}`] }
        className={`${this.props.className}__arrow ${this.props.className}__arrow--${dir}`}
      >
        { this.props.arrow[dir] }
      </div>
    );
  }
  renderLastView() {
    return (
      <section
        ref="viewport_last"
        style={ this.getLastStyle() }
        className={`${this.props.className}__view ${this.props.className}__view--last`}
      >
        { this.props.children[this.state.lastItem] }
      </section>
    );
  }

  renderActiveView() {
    return (
      <section
        ref="viewport_active"
        style={ this.getActiveStyle() }
        className={`${this.props.className}__view ${this.props.className}__view--active`}
      >
        { this.props.children[this.state.activeItem] }
      </section>
    );
  }

  renderSlideView() {
    return (
      <section
        className={`${this.props.className}__wrapper`}
        style={style.wrapper}
        data-current-index={this.state.activeItem}
      >
        { this.renderActiveView() }
        { this.renderLastView() }
      </section>
    );
  }

  renderSlides() {
    if (!this.props.touchGestures) {
      return this.renderSlideView();
    }
    return (
      <Touch
        onSwipeLeft={ this.next.bind(this) }
        onSwipeRight={ this.prev.bind(this) }
      >
        { this.renderSlideView() }
      </Touch>
    );
  }

  render() {
    return (
      <div className={ this.props.className } style={ style.slider }>
        { this.renderSlides() }
        { this.renderNavArrow('left') }
        { this.renderNavArrow('right') }
        <section className={`${this.props.className}__dots`} style={ style.dots }>
          { this.renderDots() }
        </section>
      </div>
    );
  }
}


Slider.propTypes = {
  arrows: React.PropTypes.bool,
  autoplay: React.PropTypes.bool,
  children: React.PropTypes.any.isRequired,
  className: React.PropTypes.string,
  delay: React.PropTypes.number,
  direction: React.PropTypes.string,
  dots: React.PropTypes.bool,
  initialSlide: React.PropTypes.number,
  touchGestures: React.PropTypes.bool,
  transition: React.PropTypes.any,
  transitionTime: React.PropTypes.number,

  onChange: React.PropTypes.func,
  onShow: React.PropTypes.func,

  dot: React.PropTypes.element,
  arrow: React.PropTypes.object,
};

Slider.defaultProps = {
  arrows: true,
  autoplay: true,
  className: 'slider',
  delay: 5000,
  direction: 'right',
  dots: false,
  initialSlide: 0,
  touchGestures: true,
  transition: Fade,
  transitionTime: 0.5,

  onChange: () => { },
  onShow: () => { },

  dot: <span>&#8226;</span>,
  arrow: {
    left: <span>&#8249;</span>,
    right: <span>&#8250;</span>,
  },
};

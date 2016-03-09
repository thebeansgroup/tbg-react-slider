import React from 'react';
import ReactDOM from 'react-dom';
import style from './Style';
import { Fade } from './Transitions';

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
    const Transition = this.props.transition;

    this.transition = new Transition;
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

  getActiveStyle() {
    if (!this.state.active) {
      return Object.assign(
        this.transition.end(this.state.direction, this.state.viewport.active),
        this.transition.transition(this.props.transitionTime)
      );
    }
    return this.transition.start(this.state.direction, this.state.viewport.active);
  }

  getLastStyle() {
    if (!this.state.active) {
      return Object.assign(
        this.transition.prevEnd(this.state.direction, this.state.viewport.last),
        this.transition.transition(this.props.transitionTime),
        style.lastView
      );
    }
    return Object.assign(
      this.transition.prevStart(this.state.direction, this.state.viewport.last),
      style.lastView
    );
  }

  getNextItem(dir) {
    const direction = dir === 'left' ? -1 : 1;
    this.setState({ direction });
    return this.state.activeItem + direction;
  }


  setActive(active) {
    this.setState({ active });
  }

  nextSlide() {
    this.getNextItem('right');
  }
  previousSlide() {
    this.getNextItem('left');
  }

  start() {
    this.delayInterval = setInterval(
      this.incrementActiveItem.bind(this),
      this.props.delay
    );
  }

  stop() {
    clearInterval(this.delayInterval);
  }

  endTransition() {
    this.transitionTimeout = setTimeout(this.setActive.bind(this, false), 30);
    this.props.onChange();
    this.props.onShow(this.state.activeItem);
  }


  // refactor
  incrementActiveItem(dir = this.props.direction) {
    let activeItem = this.getNextItem(dir);

    if (activeItem > this.props.children.length - 1) {
      activeItem = 0;
    }
    if (activeItem < 0) {
      activeItem = this.props.children.length - 1;
    }

    this.gotoNextSlide(activeItem);
  }

  gotoNextSlide(activeItem) {
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

  handleDotClick(index) {
    this.stop();
    this.gotoNextSlide(index);
    if (this.props.autoplay) { this.start(); }
  }

  // this is all sorts of dodge
  renderDots() {
    if (!this.props.showDots) { return null; }
    return (
      this.props.children.map((child, i) => {
        let color = '#ccc';
        if (i === this.state.activeItem) { color = '#333'; }
        return (
          <span
            onClick={ this.handleDotClick.bind(this, i) }
            key={`dot_${i}`}
            className="slider__dot"
            style={{ color }}
          >
            { this.props.dot }
          </span>
        );
      })
    );
  }

  renderNavArrow(dir) {
    if (!this.props.showArrows) { return null; }
    return (
      <div
        onClick={ this.handleArrowClick.bind(this, dir) }
        className={`slider__arrow slider__arrow--${dir}`}
        style={ style[`nav__${dir}`] }
      >
        { this.props.arrow[dir] }
      </div>
    );
  }
  renderLastView() {
    return (
      <section
        ref="viewport_last"
        className="slider__view"
        style={ this.getLastStyle() }
      >
        { this.props.children[this.state.lastItem] }
      </section>
    );
  }

  renderActiveView() {
    return (
      <section
        ref="viewport_active"
        className="slider__view"
        style={ this.getActiveStyle() }
      >
        { this.props.children[this.state.activeItem] }
      </section>
    );
  }

  render() {
    return (
      <div className={ this.props.className } style={ style.slider }>
        <section style={style.wrapper}>
          { this.renderActiveView() }
          { this.renderLastView() }
        </section>
        { this.renderNavArrow('left') }
        { this.renderNavArrow('right') }
        <section className="slider__dots" style={ style.dots }>
          { this.renderDots() }
        </section>
      </div>
    );
  }
}


Slider.propTypes = {
  onChange: React.PropTypes.func,
  onShow: React.PropTypes.func,
  initialSlide: React.PropTypes.number,
  autoplay: React.PropTypes.bool,
  showArrows: React.PropTypes.bool,
  showDots: React.PropTypes.bool,
  delay: React.PropTypes.number,
  transitionTime: React.PropTypes.number,
  direction: React.PropTypes.string,
  className: React.PropTypes.string,
  transitionType: React.PropTypes.string,
  children: React.PropTypes.any.isRequired,
  dot: React.PropTypes.element,
  arrow: React.PropTypes.object,
  transition: React.PropTypes.any,
};

Slider.defaultProps = {
  onChange: () => { },
  onShow: () => { },
  delay: 5000,
  autoplay: true,
  initialSlide: 0,
  showArrows: true,
  showDots: true,
  direction: 'right',
  transitionTime: 0.5,
  className: 'slider',
  dot: <span>&#8226;</span>,
  arrow: {
    left: <span>&#8249;</span>,
    right: <span>&#8250;</span>,
  },
  transition: Fade,
};

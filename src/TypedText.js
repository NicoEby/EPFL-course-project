import React, { Component } from 'react';
import Typed from 'typed.js';

class TypedText extends Component {
  componentDidMount() {
    const { strings } = this.props;
    const options = {
      strings: strings,
      typeSpeed: 50,
      showCursor: false
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentDidUpdate(prevProps){
      if(this.props.strings !== prevProps.strings){
        this.typed.destroy();
        const { strings }  = this.props;
        const options = {
          strings: strings,
          typeSpeed: 50,
          showCursor: false
        };
        this.typed = new Typed(this.el, options);
      }
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (

      <div className="type-wrap">
        <span
          style={{ whiteSpace: 'pre' }}
          ref={(el) => { this.el = el; }}
        />
      </div>

    );
  }
}
export default TypedText;
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DicewarePasswordRenderer extends Component {

  render() {
    return <p>{this.props.password}</p>;
  }
}

DicewarePasswordRenderer.propTypes = {
  password: PropTypes.string.isRequired
};

export default DicewarePasswordRenderer;
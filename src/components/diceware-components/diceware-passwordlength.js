import React, {Component} from 'react';
import PropTypes from 'prop-types';

class DicewarePasswordLength extends Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = Number(e.target.value);
    this.props.updatePasswordLength(value);
  }

  render() {
    return <div>
      <label  className="column-left"
              htmlFor="passwordLengthInput"
              >words per password (4-10): </label>
      <input  name="passwordLengthInput" 
              className="column-right"
              value={this.props.passwordLength}
              onChange={this.handleChange}
              type={"number"}
              min={4}
              max={10}
              ></input>
    </div>;
  }
}

DicewarePasswordLength.propTypes = {
  updatePasswordLength: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired
};

export default DicewarePasswordLength;
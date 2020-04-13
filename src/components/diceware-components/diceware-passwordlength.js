import React, { Component } from "react";
import PropTypes from "prop-types";

class DicewarePasswordLength extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = Number(e.target.value);
    this.props.updatePasswordLength(value);
  }

  render() {
    return (
      <div>
        <label className="column-left" htmlFor="passwordLengthInput">
          words per password ({this.props.minPasswordLength}-
          {this.props.maxPasswordLength}):{" "}
        </label>
        <input
          name="passwordLengthInput"
          className="column-right"
          value={this.props.passwordLength}
          onChange={this.handleChange}
          type={"number"}
          min={this.props.minPasswordLength}
          max={this.props.maxPasswordLength}
        ></input>
      </div>
    );
  }
}

DicewarePasswordLength.propTypes = {
  updatePasswordLength: PropTypes.func.isRequired,
  passwordLength: PropTypes.number.isRequired,
  maxPasswordLength: PropTypes.number.isRequired,
  minPasswordLength: PropTypes.number.isRequired,
};

export default DicewarePasswordLength;

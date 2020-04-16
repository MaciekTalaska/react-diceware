import React, { Component } from "react";
import PropTypes from "prop-types";

class DicewarePasswordSeparator extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updateSeparator(e.target.value);
  }

  render() {
    return (
      <div>
        <label className="column-left" htmlFor="separatorInput">
          separator:{" "}
        </label>
        <input
          name="separatorInput"
          className="column-right"
          value={this.props.separator}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

DicewarePasswordSeparator.propTypes = {
  updateSeparator: PropTypes.func.isRequired,
  separator: PropTypes.string.isRequired,
};

export default DicewarePasswordSeparator;

import React, { Component } from "react";
import propTypes from "prop-types";
import DpgDiv from "./ui/dpgdiv";

class DicewareLanguage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updatePasswordLanguage(e.target.value);
  }

  render() {
    return (
      <DpgDiv>
        <label htmlFor="languageInput" className="column-left">
          language:
        </label>
        <select
          name="languageInput"
          className="column-right"
          onChange={this.handleChange}
        >
          <option value="en">English</option>
          <option value="fi">Finnish</option>
          <option value="mi">Maori</option>
          <option value="pl">Polish</option>
        </select>
      </DpgDiv>
    );
  }
}

DicewareLanguage.propTypes = {
  updatePasswordLanguage: propTypes.func.isRequired,
};

export default DicewareLanguage;

import React, {Component} from 'react';

class DicewareLanguage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.updatePasswordLanguage(e.target.value);
    console.log('DicewareLanguage, onChange: ', e.target.value);
  }

  render() {
    return <div>
      <label  htmlFor="languageInput"
              className="column-left"
              >language:</label>
      <select name="languageInput"
              className="column-right"
              onChange={this.handleChange}>
        <option value="en">English</option>
        <option value="fi">Finnish</option>
        <option value="mi">Maori</option>
        <option value="pl">Polish</option>
      </select>
    </div>    
  }
}

export default DicewareLanguage;
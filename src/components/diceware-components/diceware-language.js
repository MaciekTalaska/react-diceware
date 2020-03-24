import React, {Component} from 'react';

class DicewareLanguage extends Component {

  render() {
    return <div>
      <label  htmlFor="languageInput"
              className="column-left"
              >language:</label>
      <select name="languageInput"
              className="column-right">
        <option value="en">English</option>
        <option value="fi">Finnish</option>
        <option value="mi">Maori</option>
        <option value="pl">Polish</option>
      </select>
    </div>    
  }
}

export default DicewareLanguage;
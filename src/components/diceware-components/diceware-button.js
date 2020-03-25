import React, {Component} from 'react';

class DicewareButton extends Component {
  constructor(props) {
    super(props);
    this.generatePassword = this.generatePassword.bind(this);
  }

  generatePassword(e) {
    this.props.regeneratePassword(e);
  }

  render() {
    return <div>
      <button onClick={this.generatePassword}>Generate password</button>
    </div>;
  }
}

export default DicewareButton;
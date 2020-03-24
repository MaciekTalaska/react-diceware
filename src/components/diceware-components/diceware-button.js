import React, {Component} from 'react';

class DicewareButton extends Component {
  constructor(props) {
    super(props);
    this.forceRefresh = this.forceRefresh.bind(this);
  }

  forceRefresh(e) {
    this.props.onNewNumberRequest(e);
  }

  render() {
    return <div>
      <button onClick={this.forceRefresh}>Generate password</button>
    </div>;
  }
}

export default DicewareButton;
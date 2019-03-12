import React, {PureComponent} from 'react';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <input v-on={this.state.value} />
      </div>
    )
  }
}

import React, {PureComponent} from 'react';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [{message: 'Foo'}, {message: 'Bar'}],
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <input v-model={this.state.value} />
        <ul>
          <li v-for="item in this.state.items">{'item.message'}</li>
        </ul>
        {[1, 2, 3].map(x => (
          <p>{x}</p>
        ))}
      </div>
    );
  }
}

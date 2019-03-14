import React, {PureComponent} from 'react';

export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [{message: 'Foo'}, {message: 'Bar'}],
    };
  }

  addHandle = () => {
    const {items} = this.state;
    this.setState({items: [...items, {message: 'Tail'}]});
  };

  decreaseHandle = () => {
    const {items} = this.state;
    this.setState({item: [items.pop()]});
  };

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <input v-model={this.state.value} />
        <ul>
          <li for={item in this.state.items}>{item.message}</li>
        </ul>
        <button onClick={this.addHandle}>add</button>
        <button onClick={this.decreaseHandle}>decrease</button>
        <hr />
        <Self />
      </div>
    );
  }
}

class Self extends PureComponent {
  render() {
    return [<span>1</span>, <span>2</span>];
  }
}

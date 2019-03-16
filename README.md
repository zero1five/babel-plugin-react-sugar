# React-sugar
在react里提供 v-for、v-model、v-if、 自动绑定key 的语法糖。

## Usage

#### install

```
npm i babel-plugin-react-sugar --save-dev
```

#### update `.babelrc`

```js
{
  "plugins": [
    ["react-sugar", {
      // options
    }]
  ]
}
```

## Example

```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      items: [{message: 'Foo'}, {message: 'Bar'}],
      onShow: true
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
          <li v-for={item in this.state.items}>
            <p>{item.message}</p>
            <p>{item.message ? 'true' : 'false'}</p>
          </li>
        </ul>
        <button onClick={this.addHandle}>add</button>
        <button onClick={this.decreaseHandle}>decrease</button>
        <hr />
        <Self v-if={this.state.onShow} />
        <button onClick={() => this.setState({ onShow: !this.state.onShow })}>{this.state.onShow ? 'onShow' : 'onFalse'}</button>
      </div>
    );
  }
}

class Self extends PureComponent {
  render() {
    return [<span>1</span>, <span>2</span>];
  }
}
```
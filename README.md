# React-sugar
在react里提供 v-for、v-model、 自动绑定key 的语法糖。

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
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <input v-model={this.state.value} />
        <ul>
          <li v-for={item in this.state.items}>
            {item.message}
          </li>
        </ul>
      </div>
    );
  }
}
```
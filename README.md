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

#### v-model

```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render() {
    return (
      <div>
        <p>{this.state.value}</p>
        <input v-model={this.state.value} />
      </div>
    );
  }
}
```

#### ```bindAttrName```

```js
{
  "plugins": [
    ["react-sugar", {
      // v-model
      bindAttrName: 'r-model',
    }]
  ]
}
```

```jsx
//...
render() {
  return (
    <div>
      <p>{this.state.value}</p>
      <input r-model={this.state.value} />
    </div>
  );
}
```

#### v-for

```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      items: [{message: 'Foo'}, {message: 'Bar'}],
    };
  }

  render() {
    return (
      <ul>
        <li v-for={item in this.state.items}>
          <p>{item.message}</p>
          <p>{item.message ? 'true' : 'false'}</p>
        </li>
      </ul>
    );
  }
}
```

#### ```loopAttrName```

```js
{
  "plugins": [
    ["react-sugar", {
      // v-for
      loopAttrName: 'r-for',
    }]
  ]
}
```

#### v-if 

```jsx
export default class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      onShow: true,
    };
  }

  render() {
    return (
      <div>
        <Self v-if={this.state.onShow} />
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

#### ```ifAttrName```

```js
{
  "plugins": [
    ["react-sugar", {
      // v-if
      ifAttrName: 'r-if',
    }]
  ]
}
```
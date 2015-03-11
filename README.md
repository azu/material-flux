# material-flux [![Build Status](https://travis-ci.org/undefined.svg?branch=master)](https://travis-ci.org/undefined)


Imaginary flux implementation.

- less trick
- debuggable
- ECMAScript6 compatible
- Class syntax

## Installation

- [ ] Describe the installation process

## Usage

material-flux is consist of `Action`, `Store` and `Flux`.

### Action

```js
import {Action} from "material-flux"
export var keys = {
    "doSomething": "doSomething"
};
export default class UserAction extends Action {
    [keys.doSomething](data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        this.dispatch(keys.doSomething, data);
    }
}
```

When you call action, dispatch store's handler.

### Store

```js
import {keys} from "./UserAction.js"
import {Store} from "material-flux"
export default class UserStore extends Store {
    constructor(flux) {
        this.state = {
            userData: null
        };
        flux.register(keys.doSomething, this.onHandler);
    }

    onHandler(data) {
        // data is come from Action
        this.setState({
            userData: data
        });
    }

    // just getter method
    getUserData() {
        return this.state.userData;
    }
}
```

#### Store#onChange(listener)

Adds a listener to the end of the listeners array for the "change" event. 

- `listener` is a `function`.

#### Store#setState(object)

Update `this.state` and emit "change" event.

- `object` is any object.

#### Store#removeAllChangeListeners()

Removes all "change" listeners.

### Flux

How to connect Action and Store?
=> Create connection object. it is called `Flux` in this context.

```js
import UserAction from "./UserAction.js"
import UserStore from "./UserStore.js"
import {Flux} from 'material-flux';
export default class UserFlux extends Flux {
    constructor() {
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}
```

### View(Component)

How to connect to View like React?
=> Pass an instance of `Flux` to React's Component.

```js
import React from 'react';
import UserFlux from './UserFlux.js';
import App from './AppComponent.jsx';
var flux = new UserFlux();
React.render(
    React.createElement(App, { flux }),
    document.getElementById('main')
);
```

AppComponent:

```js
import React from 'react';
export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.flux.userStore;
        this.state = {
            userData: this.userStore.getUserData()
        };
    }

    _onChange() {
        this.setState({
            userData: this.userStore.getUserData()
        });
    }

    componentDidMount() {
        this.userStore.onChange(this._onChange.bind(this));
    }

    componentWillUnmount() {
        this.userStore.removeAllChangeListeners();
    }

    onClick(event) {
        var { flux } = this.props;
        flux.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </div>
        );
    }
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

## Inspiration and thanks

- [Flummox](https://github.com/acdlite/flummox/tree/63e1f13f26724aa1f97da449ea61a3abcbf45360 "Flummox")

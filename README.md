# material-flux

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
export default class UserAction extends Action {
    doSomething(data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        return data;
    }
}
```

You can call Action following that:

```js
// it's instance is proxy(instance).
var userAction = new UserAction();
var userData = "some data";
userAction.doSomething(userData);
```

### Store

```js
import {Store} from "material-flux"
export default class UserStore extends Store {
    constructor(flux) {
        // methodMap manage correspondence relationship between Action's method and Store's handler.
        var methodMap = new WeakMap();
        var action = flux.userAction;// `flux.userAction` is the instance of `UserAction` class. 
        methodMap.set(action.doSomething, this.onHandler);
        this.registerMap(methodMap);
        
        this.state = {
            userData : null
        };
    }
    onHandler(data){
      // data is come from Action
      this.setState({
        userData : data
      });
    }
    // just getter method
    getUserData(){
        return this.state.userDate;
    }
}
```

#### Store#setState(object)

Update `this.state` and dispatch change.

- `object` is any object.

### Flux

How to connect Action and Store?
=> Create connection object. it is called `Flux` in this context.

```js
import UserAction from "./UserAction.js"
import UserStore from "./UserStore.js"
import {Flux} from 'material-flux';

export default class UserFlux extends Flux {
    constructor() {
        this.userAction = new UserAction();
        // TODO: dependent the order?
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
        var { flux } = props;
        this.state = {
            userData: flux.userStore.getUserData()
        };
    }

    onClick(event) {
        var { flux } = this.props;
        flux.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick}>
                userData: {this.state.userData}
            </div>
        );
    }
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

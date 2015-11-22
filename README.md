# material-flux [![Build Status](https://travis-ci.org/azu/material-flux.svg?branch=master)](https://travis-ci.org/azu/material-flux)

No magic flux implementation library.

- Less trick
    - No method swizzle, No overwrite function
    - IDE Readable API(Machine Readable API)
- Debuggable
- ECMAScript6 compatible
- Class syntax

## Installation

    npm install material-flux

## Usage

material-flux is consist of `Action`, `Store` and `Context`.

## Flux Architecture

User action -> `Action` -> `Context` dispatch -> `Store` received dispatch
-> Store dispatch `"change"` event -> View received the "change". -> update view.

![flow image](docs/figures/material-flux.png)

- `Context` provide `dispatch` function to `Action`s.
- `Context` register store for dispatched event.
- `Action` dispatch event.
- `Store` received dispatched event with data.
- `Store` dispatch "change" event when update state in the store.

### Action

```js
import {Action} from "material-flux"
// it's a like constants
export const keys = {
    // "any key" : "any value"
    "doSomething": "unique value"
};
export default class UserAction extends Action {
    doSomething(data) {
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
   constructor(...args) {
       super(...args);
       this.state = {
           userData: null
       };
       this.register(keys.doSomething, this.onHandler);
   }

   // data is come from Action
   onHandler(data) {
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

#### Store#removeChangeListener(listener)

Removes a "change" listener.

- `listener` is a `function`.

#### Store#removeAllChangeListeners()

Removes all "change" listeners.

#### Store#getState()

Return state object that shallowly clone store's `state`.

#### Store#setState(object)

Update `this.state` and emit "change" event.

- `object` is any object.


### Context

How to connect Action and Store?
=> Create connection object. it is called `Context` in this context.

```js
import UserAction from "./UserAction.js"
import UserStore from "./UserStore.js"
import {Context} from 'material-flux';
export default class UserContext extends Context {
    constructor() {
        super();
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}
```

### View(Component)

How to connect to View like React?
=> Pass an instance of `Context` to React's Component.

```js
import React from 'react';
import UserContext from './UserContext.js';
import App from './AppComponent.jsx';
var context = new UserContext();
React.render(
    React.createElement(App, { context }),
    document.getElementById('main')
);
```

AppComponent:

```js
import React from 'react';
export default class AppComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.userStore = this.props.context.userStore;
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
        var { context } = this.props;
        context.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </div>
        );
    }
}
```

## Examples

more examples.

- [examples/](examples/)
- [voronianski/flux-comparison](https://github.com/voronianski/flux-comparison "voronianski/flux-comparison") > [material-flux](https://github.com/voronianski/flux-comparison/tree/master/material-flux "material-flux")

## Tests

```
npm test
# it run mocha & npm run test:typing.
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

- [Flummox](https://github.com/acdlite/flummox/ "Flummox")
    - Andrew Clark <acdlite@me.com>

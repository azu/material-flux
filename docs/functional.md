# Alternative OOP Thought

Write parts as pure JavaScript object!

## Inspiration

- [Components as ES6 classes · Issue #3400 · facebook/react](https://github.com/facebook/react/issues/3400 "Components as ES6 classes · Issue #3400 · facebook/react")
- [Programming JavaScript Applications](http://chimera.labs.oreilly.com/books/1234000000262/ch03.html "Programming JavaScript Applications")

### Action

```js
export var keys = {
    "doSomething": "doSomething"
};
function UserAction({dispatch}) {
    return {
        [keys.doSomething](data) {
            // pass the `data` to Store's `onHandler`
            // call `onHandler(data);`
            dispatch(keys.doSomething, data);
        }
    }
}
export default UserAction;
```

### Store

```js
import {keys} from "./UserAction.js"
import {Store} from "material-flux"
function UserStore({setState, register}){
    var state = {
        userData: null
    };
    function onHandler(data) {
       setState({
           userData: data
       });
    }
    // mapping between action and store
    register(keys, onHandler);
    
    // Public API
    let api = {
       // just getter method
       getUserData() {
           return state.userData;
       }
    };
    return api;
}
export default UserStore;
```

### Context

```js
import UserAction from "./UserAction.js"
import UserStore from "./UserStore.js"
function UserContext(context){
    var userAction = new UserAction(context.action);
    var userStore = new UserStore(context.store);
    return {
        userAction
        userStore
    };
}
export default UserContext;
```

### View(Component)

How to connect to View like React?
=> Pass an instance of `Context` to React's Component.

```js
import React from 'react';
import UserContext from './UserContext.js';
import App from './AppComponent.jsx';
import {Context} from "material-flux"
var context = new Context(UserContext);
React.render(
    React.createElement(App, { context }),
    document.getElementById('main')
);
```

AppComponent:

```js
import React from 'react';
export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
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

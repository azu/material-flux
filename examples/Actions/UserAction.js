// LICENSE : MIT
"use strict";
var Action = require("material-flux").Action;
export var keys = {
    "doSomething": "doSomething"
};
class UserAction extends Action {
    doSomething(data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        this.dispatch(keys.doSomething, data);
    }
}
export default UserAction;
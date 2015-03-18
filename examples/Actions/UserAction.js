// LICENSE : MIT
"use strict";
import { Action } from "material-flux";
import Symbol from "es6-symbol";

export var keys = {
    // "any key" : "any value"
    // it's a constants
    "doSomething": Symbol("unique value for doSomething")
};
class UserAction extends Action {
    doSomething(data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        this.dispatch(keys.doSomething, data);
    }
}
export default UserAction;
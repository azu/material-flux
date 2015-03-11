// LICENSE : MIT
"use strict";
import {Action} from "material-flux"
export var keys = {
    "doSomething": "doSomething"
};
export default class UserAction extends Action {
    [keys.doSomething](data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        this.dispatch(keys.doSomething,data);
    }
}
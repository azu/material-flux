// LICENSE : MIT
"use strict";
import {Action} from "material-flux"
export default class UserAction extends Action {
    doSomething(data) {
        // pass the `data` to Store's `onHandler`
        // call `onHandler(data);`
        return data;
    }
}
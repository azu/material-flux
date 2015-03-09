// LICENSE : MIT
"use strict";
import {Store} from "material-flux"
export default class UserStore extends Store {
    constructor(flux) {
        // methodMap manage correspondence relationship between Action's method and Store's handler.
        var methodMap = new WeakMap();
        var action = flux.userAction;// `flux.userAction` is the instance of `UserAction` class.
        methodMap.set(action.doSomething, this.onHandler);
        this.registerMap(methodMap);

        this.state = {
            userData: null
        };
    }

    onHandler(data) {
        // data is come from Action
        this.setState({
            userData: data
        });
    }

    // just getter method
    getUserData() {
        return this.state.userDate;
    }
}
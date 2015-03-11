// LICENSE : MIT
"use strict";
import {keys} from "../Actions/UserAction.js"
import {Store} from "material-flux"
export default
class UserStore extends Store {
    constructor(flux) {
        super(flux);
        this.state = {
            userData: null
        };
        this.register(keys.doSomething, this.onHandler);
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
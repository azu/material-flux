// LICENSE : MIT
"use strict";
import UserAction from "./Actions/UserAction.js"
import UserStore from "./Stores/UserStore.js"
import {Context} from "material-flux";

export default class UserContext extends Context {
    constructor() {
        super();
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}
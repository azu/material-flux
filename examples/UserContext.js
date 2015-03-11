// LICENSE : MIT
"use strict";
import UserAction from "./Actions/UserAction.js"
import UserStore from "./Stores/UserStore.js"
import {Flux} from 'material-flux';

export default class UserFlux extends Flux {
    constructor() {
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}
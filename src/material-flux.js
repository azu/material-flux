// LICENSE : MIT
"use strict";
import { Dispatcher } from 'flux';
export default
class Flux {
    constructor() {
        this.dispatcher = new Dispatcher();
        this._stores = {};
        this._actions = {};
    }

    // define the relationship between Actions and Stores.
    registerMap() {
        // action method hook
        // set dispatch to store's handler
        // action <- dispatcher -> store
        // in store register mapping
    }

    dispatch() {
        // from action to store
    }
}
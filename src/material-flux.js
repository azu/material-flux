// LICENSE : MIT
"use strict";
import { Dispatcher } from 'flux';
export default
class Flux {
    constructor() {
        this.dispatcher = new Dispatcher();
    }

    dispatch(eventKey, ...args) {
        this.dispatcher.dispatch(eventKey, args);
        this.emit('dispatch', eventKey, args);
    }
}
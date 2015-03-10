// LICENSE : MIT
"use strict";
import { Dispatcher } from 'flux';
export default
class Flux {
    constructor() {
        this.dispatcher = new Dispatcher();
    }

    register(eventkey, context, handler) {
        let token = this.dispatcher.register(handler.bind(context));
    }

    dispatch(eventKey, ...args) {
        this.dispatcher.dispatch({
            eventKey,
            args
        });
        this.emit('dispatch', eventKey, args);
    }
}
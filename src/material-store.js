// LICENSE : MIT
"use strict";
import {EventEmitter} from 'events';
import assign from 'object-assign';
class MaterialStore extends EventEmitter {
    constructor(flux) {
        this.state = undefined;
        this.flux = flux;
    }


    register(eventkey, handler) {
        this.flux.register(eventKey, this, handler);
    }

    handler(payload) {
        let {
            args,
            eventKey
            } = payload;
        if (this.hasOwnProperty(eventKey) && typeof this[eventKey] === "function") {
            var handler = this[eventKey];
            handler.apply(this, args);
        }
    }

    setState(newState) {
        if (typeof this.state === 'undefined') {
            this.state = {};
        }

        this.state = assign({}, this.state, newState);
        this.emit('change');
    }
}
export default MaterialStore;
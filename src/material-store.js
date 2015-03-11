// LICENSE : MIT
"use strict";
import {EventEmitter} from 'events';
import assign from 'object-assign';
class MaterialStore extends EventEmitter {
    constructor(flux) {
        this.flux = flux;
        this.state = undefined;
        this._handlers = {};
    }


    register(eventkey, handler) {
        if (typeof handler !== 'function') {
            return;
        }
        this._handlers[eventkey] = handler.bind(this);
        this.flux._registerStore(this);
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
    waitFor(tokensOrStores) {
        // _waitFor come from flux module.
        this._waitFor(tokensOrStores);
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
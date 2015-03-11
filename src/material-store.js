// LICENSE : MIT
"use strict";
import {EventEmitter} from "events";
import objectAssign from "object-assign";
class MaterialStore extends EventEmitter {
    constructor(flux) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof flux === "undefined") {
                console.trace(
                    `Constructor arguments is missing.`
                );
            }
        }
        this.flux = flux;
        this.state = undefined;
        this._handlers = {};
    }


    register(eventKey, handler) {
        if (typeof handler !== 'function') {
            return;
        }
        this._handlers[eventKey] = handler.bind(this);
        this.flux._registerStore(this);
    }

    /**
     * This handler is dispatched with payload by flux module.
     * @param {object} payload the payload has eventKey and passing arguments.
     */
    handler(payload) {
        let {
            args,
            eventKey
            } = payload;
        if (typeof this._handlers[eventKey] === "function") {
            var handler = this._handlers[eventKey];
            handler.apply(this, args);
        }
    }

    onChange(callback){
        this.on("change", callback);
    }

    waitFor(tokensOrStores) {
        // _waitFor come from flux module.
        this._waitFor(tokensOrStores);
    }

    setState(newState) {
        if (typeof this.state === 'undefined') {
            this.state = {};
        }

        this.state = objectAssign({}, this.state, newState);
        this.emit('change');
    }
}
export default MaterialStore;
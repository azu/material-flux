// LICENSE : MIT
"use strict";
import EventEmitter from 'eventemitter';
import assign from 'object-assign';
class MaterialStore extends EventEmitter {
    constructor() {
        this.state = undefined;
    }

    setState(newState) {
        if (typeof this.state === 'undefined') {
            this.state = {};
        }

        this.state = assign({}, this.state, newState);
        this.emit('change');
    }

    /**
     *
     * @param {WeakMap} map
     */
    registerMap(map) {

    }
}
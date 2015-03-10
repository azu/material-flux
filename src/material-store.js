// LICENSE : MIT
"use strict";
import {EventEmitter} from 'events';
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
     * register Action's method(map key) to Store's handler(map value)
     * @param {WeakMap} map
     */
    registerMap(map) {
        this.eventHandelrMap = map;
    }
}
export default MaterialStore;
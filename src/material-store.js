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
}
export default MaterialStore;
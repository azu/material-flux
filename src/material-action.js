// LICENSE : MIT
"use strict";
export default
class Action {
    // a child has to call `super()`
    constructor(flux) {
        this.dispatch = flux.dispatch.bind(flux);
    }
}

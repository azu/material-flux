// LICENSE : MIT
"use strict";
export default
class Action {
    // a child has to call `super()`
    constructor(flux) {
        if (process.env.NODE_ENV !== 'production') {
            if (typeof flux === "undefined") {
                console.trace(
                    `Constructor arguments is missing.`
                );
            }
        }
        this.dispatch = flux.dispatch.bind(flux);
    }
}

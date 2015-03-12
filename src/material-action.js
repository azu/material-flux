// LICENSE : MIT
"use strict";
export default
class Action {
    // a child has to call `super()`
    constructor(flux) {
        if (process.env.NODE_ENV !== 'production') {
            require("assert")(typeof flux !== "undefined",
                `Constructor arguments is undefined.
                Please \`new ${this.constructor.name}(flux)\`
                `
            );
        }
        this.dispatch = flux.dispatch.bind(flux);
    }
}

// LICENSE : MIT
"use strict";
export default class Action {
    constructor(context) {
        if (process.env.NODE_ENV !== 'production') {
            require("assert")(typeof context !== "undefined",
                `Constructor arguments is undefined.
                Please \`new ${this.constructor.name}(context)\`
                `
            );
        }
        this.dispatch = context.dispatch.bind(context);
    }
}

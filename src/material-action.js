// LICENSE : MIT
"use strict";
export default class Action {
    /**
     * @param {MaterialContext} context
     */
    constructor(context) {
        if (process.env.NODE_ENV !== 'production') {
            require("assert")(typeof context !== "undefined",
                `Constructor arguments is undefined.
                Please \`new ${this.constructor.name}(context)\`
                `
            );
            require("assert")(typeof context.dispatch !== "undefined",
                `Constructor arguments was unexpected object.
                Please \`new ${this.constructor.name}(context)\`
                `
            );
        }
        this.dispatch = context.dispatch.bind(context);
    }
}

// LICENSE : MIT
"use strict";
export default
class Actions {
    // a child has to call `super()`
    constructor() {
        var methodNames = this._getActionMethodNames();
        for (var i = 0; i < methodNames.length; i++) {
            var methodName = methodNames[i];
            this._wrapAction(methodName);
        }
        Object.defineProperty(this, "__calledConstructor", {
            value: true
        });
    }

    _getActionMethodNames(instance) {
        return Object.getOwnPropertyNames(this.constructor.prototype)
            .filter(name =>
            name !== 'constructor' &&
            typeof this[name] === 'function'
        );
    }

    _wrapAction(methodName) {
        var originalMethod = this[methodName];
        var actionId = this._createActionId(methodName);

        var action = (...args) => {
            var body = originalMethod.apply(this, args);

            if (isPromise(body)) {
                var promise = body;
                this._dispatchAsync(actionId, promise, args, methodName);
            } else {
                this._dispatch(actionId, body, args, methodName);
            }

            // Return original method's return value to caller
            return body;
        };

        action._id = actionId;

        this[methodName] = action;
    }

    _dispatch(actionId, body, args, methodName) {
        if (typeof this.dispatch === 'function') {
            if (typeof body !== 'undefined') {
                this.dispatch(actionId, body, args);
            }
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(
                    `You've attempted to perform the action `
                    + `${this.constructor.name}#${methodName}, but it hasn't been added `
                    + `to a Flux instance.`
                );
            }
        }

        return body;
    }

    _dispatchAsync(actionId, promise, args, methodName) {
        if (typeof this.dispatchAsync === 'function') {
            return this.dispatchAsync(actionId, promise, args);
        } else {
            if (process.env.NODE_ENV !== 'production') {
                console.warn(
                    `You've attempted to perform the asynchronous action `
                    + `${this.constructor.name}#${methodName}, but it hasn't been added `
                    + `to a Flux instance.`
                );
            }

            return promise;
        }

    }

}

function isPromise(value) {
    return value && typeof value.then === 'function';
}

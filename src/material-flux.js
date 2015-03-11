// LICENSE : MIT
"use strict";
import { Dispatcher } from 'flux';
export default
class Flux {
    constructor() {
        this.dispatcher = new Dispatcher();
    }

    _registerStore(store) {
        if (process.env.NODE_ENV !== 'production') {
            console.warn(
                `The store'${store} is not instance of material-store.\n`
                + `import {Store} from "material-flux"`
                + `class UserStore extends Store{ ... }`
            );
        }
        let token = this.dispatcher.register(store.handler.bind(store));
        store._waitFor = this.waitFor.bind(this);
        store._token = token;
    }

    dispatch(eventKey, ...args) {
        this.dispatcher.dispatch({
            eventKey,
            args
        });
        this.emit('dispatch', eventKey, args);
    }

    waitFor(tokensOrStores) {
        if (!Array.isArray(tokensOrStores)) {
            tokensOrStores = [tokensOrStores];
        }
        let ensureIsToken = tokenOrStore => {
            return tokenOrStore instanceof Store
                ? tokenOrStore._token
                : tokenOrStore;
        };
        let tokens = tokensOrStores.map(ensureIsToken);
        this.dispatcher.waitFor(tokens);
    }
}
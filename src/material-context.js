// LICENSE : MIT
"use strict";
import {Dispatcher} from 'flux';
import {EventEmitter} from 'events';
import Store from './material-store.js';

export default class MaterialContext extends EventEmitter {
    constructor() {
        super();
        this.dispatcher = new Dispatcher();
        this._stores = [];
    }

    _registerStore(store) {
        if (process.env.NODE_ENV !== 'production') {
            require("assert")(store instanceof Store,
                `The store'${store} is not instance of material-store.\n`
                + `import {Store} from "material-flux"`
                + `class UserStore extends Store{ ... }`
            );
        }
        // guard for duplicated register
        if (this._stores.indexOf(store) >= 0) {
            return;
        }

        let token = this.dispatcher.register(store.handler.bind(store));
        store._waitFor = this.waitFor.bind(this);
        store._token = token;
        this._stores.push(store);
    }

    /**
     * dispatch function
     * @param {string} eventKey
     * @param {...} args
     */
    dispatch(eventKey, ...args) {
        this.dispatcher.dispatch({
            eventKey,
            args
        });
        this.emit('dispatch', {eventKey, args});
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
// LICENSE : MIT
"use strict";
import assert from "assert";
function _getUniformDispatcher(stores) {
    assert(
        stores && stores.length,
        'Must provide at least one store to FluxStoreGroup'
    );
    var dispatcher = stores[0].context.dispatcher;
    if (process.env.NODE_ENV !== 'production') {
        stores.forEach(store => {
            assert(
                store.context.dispatcher === dispatcher,
                'All stores in a FluxStoreGroup must use the same dispatcher'
            );
        });
    }
    return dispatcher;
}

export default class FluxStoreGroup {
    /**
     * Create StoreGroup
     * @param {MaterialStore[]} stores stores are instance of MaterialStore
     * @param {Function} callback callback is called after store's
     */
    constructor(stores, callback) {
        this._dispatcher = _getUniformDispatcher(stores);

        // Precompute store tokens.
        var storeTokens = stores.map(store => {
            assert(store._token, `${store.constructor.name} never register key.
class ${store.constructor.name} extends Store {
    constructor(..args){
        super(..args);
        // Needed!
        this.register(key, handler);
    }
}
            `);
            return store._token;
        });

        // Register with the dispatcher.
        this._dispatchToken = this._dispatcher.register(payload => {
            this._dispatcher.waitFor(storeTokens);
            callback();
        });
    }

    release() {
        this._dispatcher.unregister(this._dispatchToken);
    }
}
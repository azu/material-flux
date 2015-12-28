// LICENSE : MIT
"use strict";
module.exports = {
    Store: require("./material-store"),
    // StoreGroup is collection of stores.
    // StoreGroup has a feature that all stores are dispatched and does callback.
    StoreGroup: require("./material-store-group"),
    Action: require("./material-action"),
    Context: require("./material-context")
};
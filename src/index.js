// LICENSE : MIT
"use strict";
import Store from "./material-store"
import StoreGroup from "./material-store-group";
import Action from "./material-action";
import Context from "./material-context"
module.exports = {
    Store,
    // StoreGroup is collection of stores.
    // StoreGroup has a feature that all stores are dispatched and does callback.
    StoreGroup,
    Action,
    Context
};
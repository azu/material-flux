// LICENSE : MIT
// Type definitions for material-flux
// https://github.com/azu/material-flux
declare module 'material-flux' {

    export class Action<TPayload> {
        constructor(context:Context);

        dispatch(eventKey:any, payload:TPayload):void;
    }
    export class Store {
        constructor(context:Context);

        /**
         * register the handler with eventKey to this store.
         * @param eventKey
         * @param handler
         */
        register(eventKey:any, handler:Function):void;

        /**
         * add listener to "change" event.
         * @param {Function} callback event handler
         */
        onChange(callback:Function):void;

        /**
         * remove "change" listener
         * @param {Function} callback event handler
         */
        removeChangeListener(callback:Function):void;

        /**
         * remove all "change" events
         */
        removeAllChangeListeners():void;

        /**
         * Waits for the callbacks with the specified IDs to be invoked before continuing execution
         * of the current callback. This method should only be used by a callback in response
         * to a dispatched payload.
         */
        waitFor(tokensOrStores:string|Store):void;

        /**
         * Update `this.state` with `newState` and notify "change" event.
         */
        setState(newState:Object):void;
    }

    class Context {
        public dispatcher:any;
        private _stores:Store[];

        dispatch(eventKey, ...args):void;

        waitFor(tokensOrStores:string|Store):void;
    }
}
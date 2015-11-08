// LICENSE : MIT
// Type definitions for material-flux
// https://github.com/azu/material-flux
declare module 'material-flux' {

    /*
     * Specify a type in the 'TPayload' generic argument to use strongly-typed payloads, 
     * otherwise specify 'any'
     *
     * Examples:
     * class UserAction extends MaterialFlux.Action<any> {
     *  doSomething(data:string) {
     *      this.dispatch(keys.doSomething, data);
     *  }
     * }
     */
    export class Action<TPayload> {
        constructor(context:Context);

        dispatch(eventKey:any, payload:TPayload):void;
    }
    export class Store {
        private _handlers:{string: Function};
        private store:Object;

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

        /**
         * force notify "change" event
         * you should use this instead of `setState()` as force emit "change"
         */
        emitChange():void;
    }

    class Context {
        private dispatcher:any;
        private _stores:Store[];

        dispatch(eventKey:any, ...args:any[]):void;

        waitFor(tokensOrStores:string|Store):void;
    }
}
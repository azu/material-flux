// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var Flux = require("../").Flux;
var Store = require("../").Store;
var Action = require("../").Action;
class UserStore extends Store {
    constructor(flux) {

    }
}
class UserAction extends Action {

}
class UserFlux extends Flux {
    constructor() {
        this.action = new Action();
        this.store = new UserStore();
        var methodMap = new WeakMap();
        var action = flux.userAction;// `flux.userAction` is the instance of `UserAction` class.
        methodMap.set(action.doSomething, store.onHandler);
        flux.registerMap(methodMap);
    }
}

describe("material-flux-test", function () {
    it("has store", function () {
        var flux = new UserFlux();
        var name = Object.getOwnPropertyNames(flux);

    });
});
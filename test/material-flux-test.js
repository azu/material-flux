// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var Flux = require("../").Flux;
var Store = require("../").Store;
var Action = require("../").Action;
class UserStore extends Store {
    constructor(flux) {
        super(flux)
    }
}
class UserAction extends Action {
}
class UserFlux extends Flux {
    constructor() {
        this.action = new UserAction(this);
        this.store = new UserStore(this);
    }
}

describe("material-flux-test", function () {
    it("has store", function () {
        var flux = new UserFlux();
        var name = Object.getOwnPropertyNames(flux);

    });
});
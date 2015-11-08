// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var Context = require("../src").Context;
var Store = require("../src").Store;
var Action = require("../src").Action;

var expectedData = ["data is data"];
var keys = {
    "doSomething": "doSomething"
};
class UserAction extends Action {
    doSomething(data) {
        this.doSomething._isCalled = true;
        assert.equal(data, expectedData);
        this.dispatch(keys.doSomething, data);
    }
}
class UserStore extends Store {
    constructor(flux) {
        super(flux);
        this.register(keys.doSomething, this.onHandler);
    }

    onHandler(data) {
        this.onHandler._isCalled = true;
        assert.equal(data, expectedData);
    }
}
class UserContext extends Context {
    constructor() {
        super();
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}

describe("material-flux-test", function () {
    it("has store", function () {
        var context = new UserContext();
        context.userAction.doSomething(expectedData);
        assert(context.userAction.doSomething._isCalled);
        assert(context.userStore.onHandler._isCalled);
    });
});
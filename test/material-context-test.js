// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {Context} from "../src";
import {Store} from "../src";
import {Action} from "../src";
const expectedData = ["data is data"];
const keys = {
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
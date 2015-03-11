// LICENSE : MIT
"use strict";
var assert = require("power-assert");
var Action = require("../").Action;
var keys = {
    "doSomething": "doSomething"
};
class UserAction extends Action {
    doSomething(data) {
        this.dispatch(keys.doSomething, data);
    }
}
describe("material-action-test", function () {
    describe("dispatch", function () {
        var action;
        beforeEach(function () {
        });
        it("should called with key and data", function (done) {
            var passedData = {"userData": true};
            var fakeDispatch = function (key, data) {
                assert.strictEqual(key, keys.doSomething);
                assert.strictEqual(data, passedData);
                done();
            };
            action = new UserAction({dispatch: fakeDispatch});
            action.doSomething(passedData);
        });
    });
});
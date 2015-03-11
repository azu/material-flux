// LICENSE : MIT
"use strict";
var assert = require("power-assert");
import {Store} from "../"
import {Flux} from "../"
var eventKey = "event-key";
class UserStore extends Store {
    constructor(flux) {
        super(flux);
        this.register(eventKey, this.onHandler);
    }

    onHandler(data) {
        this.setState({
            data: data
        });
    }

    getUserData() {
        return this.state.data;
    }
}
describe("material-store-test", function () {
    describe("store's handler", function () {
        it("should set user data", function (done) {
            var flux = new Flux();
            var store = new UserStore(flux);
            var data = {"key": "value"};
            flux.on("dispatch", function () {
                var actualData = store.getUserData();
                assert.deepEqual(actualData, data);
                done();
            });
            flux.dispatch(eventKey, data);
        });
    });
    describe("#onChane", function (done) {
        it("should called when emit change event", function (done) {
            var flux = new Flux();
            var store = new UserStore(flux);
            var data = {"key": "value"};
            store.onChange(function () {
                var actualData = store.getUserData();
                assert.deepEqual(actualData, data);
                done();
            });
            flux.dispatch(eventKey, data);
        });
    });
    describe("#removeAllChangeListeners", function () {
        it("should remove all change event handler", function (done) {
            var flux = new Flux();
            var store = new UserStore(flux);
            var data = {"key": "value"};
            var chaneEventCalled = false;
            store.onChange(function () {
                chaneEventCalled = true;
            });
            flux.on("dispatch", function () {
                assert(!chaneEventCalled);
                done();
            });
            // remove "change" events
            store.removeAllChangeListeners();
            flux.dispatch(eventKey, data);
        });
    });
});
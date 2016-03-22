// LICENSE : MIT
"use strict";
const assert = require("power-assert");
import {Store, StoreGroup, Context} from "../src/";
const eventKey = "event-key";
class UserStore extends Store {
    constructor(context) {
        super(context);
        this.state = {};
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
describe("material-store-group", function () {
    describe("#callback", function () {
        it("should called after all dispatched", function (done) {
            var context = new Context();
            var stores = [new UserStore(context), new UserStore(context), new UserStore(context)];
            new StoreGroup(stores, function allDispatched() {
                var dataList = stores.map(store => {
                    return store.getUserData();
                }).filter(data => data != null);
                assert.equal(dataList.length, stores.length);
                done();
            });
            var data = {"key": "value"};
            context.dispatch(eventKey, data);
        });
    });
    describe("#release", function () {
        it("should release callback", function (done) {
            var context = new Context();
            var store = new UserStore(context);
            var stores = [store];
            var group = new StoreGroup(stores, function allDispatched() {
                throw new Error("DON'T CALLED");
            });
            // release
            group.release();
            store.onChange(() => {
                setTimeout(done, 100);
            });
            var data = {"key": "value"};
            context.dispatch(eventKey, data);
        });
    });
});
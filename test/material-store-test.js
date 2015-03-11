// LICENSE : MIT
"use strict";
var assert = require("power-assert");
import {Store} from "../"
class UserStore extends Store {
    constructor(flux) {
        super(flux);
    }
}
describe("material-store-test", function () {
    describe("store", function () {
        it("should set user data", function () {
            var store = new UserStore({

            });

        });
    });
});
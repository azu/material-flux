/// <reference path="../material-flux.ts" />
import MaterialFlux = require("material-flux");

var expectedData = ["data is data"];
var keys = {
    "doSomething": "doSomething"
};
class UserAction extends MaterialFlux.Action<any> {
    doSomething(data) {
        this.dispatch(keys.doSomething, data);
    }
}
class UserStore extends MaterialFlux.Store {
    constructor(flux) {
        super(flux);
        this.register(keys.doSomething, this.onHandler);
    }

    onHandler(data) {
    }
}
class UserContext extends MaterialFlux.Context {
    public userAction:UserAction;
    public userStore:UserStore;

    constructor() {
        super();
        this.userAction = new UserAction(this);
        this.userStore = new UserStore(this);
    }
}

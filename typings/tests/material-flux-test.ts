/// <reference path="../material-flux.ts" />
import MaterialFlux = require("material-flux");

var expectedData = "string data";
var keys = {
    "doSomething": "doSomething"
};
class UserAction extends MaterialFlux.Action<any> {
    doSomething(data:string) {
        this.dispatch(keys.doSomething, data);
    }
}
class UserStore extends MaterialFlux.Store {
    public state:Object;

    constructor(context:MaterialFlux.Context) {
        super(context);
        this.state = {};
        this.register(keys.doSomething, this.onHandler);
    }

    onHandler(data:String) {
        this.setState({
            user: data
        });
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

var context = new UserContext();
context.userAction.doSomething(expectedData);

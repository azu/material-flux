# material-flux

Imaginary flux implementation.

## Installation

- [ ] Describe the installation process

## Usage

material-flux is consist of `Action`, `Store` and `Flux`.


### Store

```js
import {Store} from "material-flux"
export default class UserStore extends Store {
    constructor(flux) {
        // methodMap manage correspondence relationship between Action's method and Store's handler.
        var methodMap = new WeakMap();
        var action = flux.userAction;// `flux.userAction` is the instance of `UserAction` class. 
        methodMap.set(action.doSomething, this.onHandler);
        this.registerMap(methodMap);
    }
    onHandler(data){
      // data is come from Action
    }
}
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT

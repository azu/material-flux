// LICENSE : MIT
// Original from http://facebook.github.io/flux/docs/flux-utils.html#container
"use strict";
import FluxStoreGroup from "./material-store-group";
import assert from "assert";
function assertBaseComponent(o) {
    assert(
        o.getStores,
        'Components that use Container must implement `static getStores()`'
    );
    assert(
        o.calculateState,
        'Components that use Container must implement `static calculateState()`'
    );
}

export default class Container {
    /**
     * Create Container of Base Component and return Container Component.
     * @param Base
     * @returns {React.Component}
     */
    static create(Base) {
        assertBaseComponent(Base);
        // define as Container class
        class ContainerComponent extends Base {
            constructor(props) {
                super(props);
                this.state = Base.calculateState(null, props);
                // initialize
                this._StoreRemoveEventListers = [];
            }

            componentDidMount() {
                if (super.componentDidMount) {
                    super.componentDidMount();
                }

                var stores = Base.getStores();

                // This tracks when any store has changed and we may need to update.
                var changed = false;
                var setChanged = () => {
                    changed = true;
                };

                // This adds subscriptions to stores. When a store changes all we do is
                // set changed to true.
                this._StoreRemoveEventListers = stores.map(
                    store => store.onChange(setChanged)
                );

                // This callback is called after the dispatch of the relevant stores. If
                // any have reported a change we update the state, then reset changed.
                var callback = () => {
                    if (changed) {
                        this.setState(prevState => {
                            return Base.calculateState(prevState, this.props);
                        });
                    }
                    changed = false;
                };
                this._fluxContainerStoreGroup = new FluxStoreGroup(stores, callback);
            }

            componentWillReceiveProps(nextProps, nextContext) {
                if (super.componentWillReceiveProps) {
                    super.componentWillReceiveProps(nextProps, nextContext);
                }
                // TODO: pure options?
                // Finally update the state using the new props.
                this.setState(prevState => Base.calculateState(prevState, nextProps));
            }

            componentWillUnmount() {
                if (super.componentWillUnmount) {
                    super.componentWillUnmount();
                }

                this._fluxContainerStoreGroup.release();
                this._StoreRemoveEventListers.forEach(removeEventListener => {
                    removeEventListener();
                });
                this._StoreRemoveEventListers = [];
            }
        }

        // Update the name of the container before returning.
        var componentName = Base.displayName || Base.name;
        ContainerComponent.displayName = 'Container(' + componentName + ')';
        return ContainerComponent;
    }
}

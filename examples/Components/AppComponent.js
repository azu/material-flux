// LICENSE : MIT
"use strict";
import React from 'react'
export default class AppComponent extends React.Component {
    constructor(...args) {
        super(...args);
        this.userStore = this.props.context.userStore;
        this.state = {
            userData: this.userStore.getUserData()
        };
    }

    _onChange() {
        this.setState({
            userData: this.userStore.getUserData()
        });
    }

    componentDidMount() {
        this.userStore.onChange(this._onChange.bind(this));
    }

    componentWillUnmount() {
        this.userStore.removeAllChangeListeners();
    }

    onClick(event) {
        var { context } = this.props;
        context.userAction.doSomething("clicked");
    }

    render() {
        return (
            <button onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </button>
        );
    }
}
// LICENSE : MIT
"use strict";
import React from 'react';
export default class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        var { flux } = props;
        this.state = {
            userData: flux.userStore.getUserData()
        };
    }

    onClick(event) {
        var { flux } = this.props;
        flux.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick}>
                userData: {this.state.userData}
            </div>
        );
    }
}
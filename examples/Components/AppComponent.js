// LICENSE : MIT
"use strict";
import React from 'react'
export default
class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.userStore = this.props.flux.userStore;
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
        this.userStore.on("change", this._onChange.bind(this));
    }

    componentWillUnmount() {

    }

    onClick(event) {
        var { flux } = this.props;
        flux.userAction.doSomething("clicked");
    }

    render() {
        return (
            <div onClick={this.onClick.bind(this)}>
                userData: {this.state.userData}
            </div>
        );
    }
}
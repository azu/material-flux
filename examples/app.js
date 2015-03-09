// LICENSE : MIT
"use strict";
import React from 'react';
import UserFlux from './UserContext.js';
import App from './Components/AppComponent.js';
var flux = new UserFlux();
React.render(
    React.createElement(App, {flux}),
    document.body
);
// LICENSE : MIT
"use strict";
import React from 'react';
import UserContext from './UserContext.js';
import App from './Components/AppComponent.js';
var context = new UserContext();
React.render(
    React.createElement(App, {context}),
    document.body
);
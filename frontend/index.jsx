import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, hashHistory} from "react-router";
import {Provider} from "react-redux";
import "./index.css";
import configureStore from "./store/configureStore";
import Index from "./pages/Index";
import Error404 from "./pages/Error404";

const store = configureStore({
    treeLoading: true
});

ReactDOM.render((
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={Index}/>
                <Route path="*" component={Error404}/>
            </Router>
        </Provider>
    ), document.getElementById('app')
);

import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';
import Layout from './pages/layout/layout';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/layout" component={ Layout } />
                    <Redirect exact from="/" to="/layout" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
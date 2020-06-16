import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Map from './pages/map/map';
import Detail from './pages/detail/detail';
import Login from './pages/login/login';


class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/layout" component={ Layout } />
                    <Route path="/map" component={ Map } />
                    <Route path="/login" component={ Login } />
                    <Route path="/detail/:houseCode" component={ Detail } />
                    <Redirect exact from="/" to="/layout" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
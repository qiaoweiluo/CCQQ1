import React, { Component } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Map from './pages/map/map';
import Detail from './pages/detail/detail';
import Login from './pages/login/login';
import Rent from './pages/rent/rent';
import Zlist from './pages/rentlist/rentlist';

import { withRouter } from 'react-router-dom';


let WithRent = withRouter( Rent );
let WithLogin = withRouter( Login );

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/layout" component={ Layout } />
                    <Route path="/map" component={ Map } />
                    <Route path="/login" component={ Login } />
                    <Route path="/zlist" component={ Zlist } />
                    <Route path="/rent" render={()=>{
                        let token = localStorage.getItem('haoke_token');
                        // 路由拦截返回的组件不包含路由属性
                        // 所以要使用withRouter高阶组件包裹后返回的组件
                        if(token){
                            return <WithRent />
                        }else{
                            return <WithLogin />
                        }

                    }} />
                    <Route path="/detail/:houseCode" component={ Detail } />
                    <Redirect exact from="/" to="/layout" />
                </Switch>
            </HashRouter>
        );
    }
}

export default App;
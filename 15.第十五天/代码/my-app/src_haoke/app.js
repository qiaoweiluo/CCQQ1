import React, { Component,Suspense, lazy } from 'react';
import { HashRouter,Route,Switch,Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Layout from './pages/layout/layout';

let Map = lazy(()=>import('./pages/map/map'));
let Detail = lazy(()=>import('./pages/detail/detail'));
let Login = lazy(()=>import('./pages/login/login'));
let Rent = lazy(()=>import('./pages/rent/rent'));
let Zlist = lazy(()=>import('./pages/rentlist/rentlist'));


let WithRent = withRouter( Rent );
let WithLogin = withRouter( Login );

class App extends Component {
    render() {
        return (
            <HashRouter>
                <Suspense fallback={<div>Loading...</div>}>
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
                </Suspense>
            </HashRouter>
        );
    }
}

export default App;
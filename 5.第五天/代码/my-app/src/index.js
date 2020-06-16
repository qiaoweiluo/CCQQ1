import React from 'react';
import ReactDOM from 'react-dom';

// 导入路由相关的组件
import { HashRouter,Link,Route} from 'react-router-dom';

import './main.css';


function Login(props){
    return (
        <div>
            <h3>用户登录</h3>
            <p>
                <label>用户名：</label>
                <input type="text"/>
            </p>
            <p>
                <label>密&nbsp;&nbsp;&nbsp;码：</label>
                <input type="password"/>
            </p>
            <p>
                <input type="button" value="登录" onClick={ ()=>{props.history.push('/layout')} } />
            </p>
        </div>
    )
}


function Content01(){
    return <h3>右侧内容一</h3>
}

function Content02(){
    return <h3>右侧内容二</h3>
}

function Content03(){
    return <h3>右侧内容三</h3>
}



class Layout extends React.Component{
    render(){
        return (
            <div>
                <div className="menu">
                   {/*  <Link to="/layout">菜单一</Link><br /><br />
                    <Link to="/layout/con02">菜单二</Link><br /><br />
                    <Link  to="/layout/con03">菜单三</Link> */}

                    <a href="#/layout">菜单一</a><br /><br />
                    <a href="#/layout/con02">菜单二</a><br /><br />
                    <a  href="#/layout/con03">菜单三</a>

                </div>
                <div className="content">
                    <Route exact path="/layout" component={ Content01 } />
                    <Route path="/layout/con02" component={ Content02 } />
                    <Route path="/layout/con03" component={ Content03 } />
                </div>
            </div>
        )
    }
}


class App extends React.Component{  
    render(){
        return (
            <HashRouter>
                <Route exact path="/" component={ Login } />             
                <Route path="/login" component={ Login } />
                <Route path="/layout" component={ Layout } />
            </HashRouter>
        )          
    }
}


ReactDOM.render(<App />,document.getElementById('root'));
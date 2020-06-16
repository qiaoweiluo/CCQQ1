import React from 'react';
import ReactDOM from 'react-dom';

// 导入路由相关的组件
import { HashRouter,Link,Route,Switch,Redirect } from 'react-router-dom';

import './main.css';


function Page01(){
    return <h2>页面内容一</h2>
}

function Page02(){
    return <h2>页面内容二</h2>
}

function Page03(){
    return (
        <div>
            <h2>新闻列表</h2>
            <ul>
                <li><Link to="/page03/detail/1001">新闻标题一</Link></li>
                <li><Link to="/page03/detail/1002">新闻标题二</Link></li>
                <li><Link to="/page03/detail/1003">新闻标题三</Link></li>
            </ul>
        </div>
    )
}

// 定义新闻详情页组件
function Detail(props){
    return <p>这是新闻详情页面！这个新闻的id值是：{ props.match.params.newsid }</p>
}



// 定义404页面的组件
function NotFound(){
    return <h3>页面未找到！</h3>
}

class App extends React.Component{  
    render(){
        return (
            <HashRouter>
                {/* 
                <Link to="/" className="active">页面一</Link>&nbsp;&nbsp;
                <Link to="/page02">页面二</Link>&nbsp;&nbsp;
                <Link to="/page03">页面三</Link> 
                */}

                <CustomLink label="页面一" to="/page01" />&nbsp;&nbsp;
                <CustomLink label="页面二" to="/page02" />&nbsp;&nbsp;
                <CustomLink label="页面三" to="/page03" exact={ true } />


                <hr />

                {/* 路由默认是模糊匹配，匹配“/”路由还可以匹配“/page01”和“/page02”  
                    需要加上“exact”参数让它精确匹配
                */}
            <Switch>
                <Route path="/page01" component={ Page01 } />
                <Route path="/page02" component={ Page02 } />
                <Route exact path="/page03" component={ Page03 } />
                <Route path="/page03/detail/:newsid" component={ Detail } />

                {/*重定向页面要写在路由倒数第二的位置 */}
                <Redirect exact from="/" to="/page01" />

                {/* 404页面的路由要写在最下面 */}
                <Route component={ NotFound } />
            </Switch>

            </HashRouter>
        )          
    }
}


// 定义自定义路由组件
function CustomLink({label,to,exact}){
    return <Route
                path={ to }
                exact={ exact }
                // match参数是系统传入的，它是一个布尔值，匹配当前路由，就是true
                // 不匹配当前路由，就是false
                children = {({match})=>(
                    <Link to={ to } className={ match?'active':'' }>{ label }</Link>
                )}  
    
            />
}




ReactDOM.render(<App />,document.getElementById('root'));
import React, { Component,lazy} from 'react';
import './layout.css';
import Home from '../home/home';
import { Route,Link } from 'react-router-dom';

let Houselist =lazy(()=>import('../houselist/houselist'));
let Info =lazy(()=>import('../info/info'));
let User =lazy(()=>import('../user/user'));

class Layout extends Component {
    render() {
        return (
            <div>
                <Route exact path="/layout" component={ Home } />
                <Route path="/layout/houselist" component={ Houselist } />
                <Route path="/layout/info" component={ Info } />
                <Route path="/layout/user" component={ User } />
                <footer>
                    <ul>
                        {/* <li className="active">
                            <Link to="/layout" className="iconfont icon-home1"></Link>
                            <h4>首页</h4>
                        </li>
                        <li>
                            <Link to="/layout/houselist" className="iconfont icon-ziyuan"></Link>
                            <h4>找房</h4>
                        </li>
                        <li>
                            <Link to="/layout/info" className="iconfont icon-zixun"></Link>
                            <h4>资讯</h4>
                        </li>
                        <li>
                            <Link to="/layout/user" className="iconfont icon-wode"></Link>
                            <h4>我的</h4>
                        </li> */}
                        <CustomLink label="首页" to="/layout" exact={ true } sClass="icon-home1" />
                        <CustomLink label="找房" to="/layout/houselist" sClass="icon-ziyuan" />
                        <CustomLink label="资讯" to="/layout/info" sClass="icon-zixun" />
                        <CustomLink label="我的" to="/layout/user" sClass="icon-wode" />
                    </ul>
                </footer>
            </div>
        );
    }
}
// 定义底部菜单的自定义路由
function CustomLink({label,to,exact,sClass}){
    return <Route 
            path = { to }
            exact = { exact }
            children={({match})=>(
                <li className={match?'active':''}>
                    <Link to={to} className={"iconfont "+sClass}></Link>
                    <h4>{ label }</h4>
                </li>
            )}
    />
}




export default Layout;
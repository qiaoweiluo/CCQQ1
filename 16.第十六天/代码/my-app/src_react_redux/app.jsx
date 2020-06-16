import React, { Component } from 'react';
import 'element-theme-default';
import { Button,Badge } from 'element-react';
import './static/css/main.css';
import banner from './static/images/banner.png';

import List from './list.jsx';
import Cart from './cart.jsx';
import { HashRouter,Route } from 'react-router-dom';
import { connect } from 'react-redux';


let App = props =>(
    <div className="main_wrap">
        <img src={ banner } alt="banner" className="banner" />
        <div className="menu">
            <a href="#/">
                <Button type="success">商品列表</Button>
            </a>
            
            <Badge value={ props.iTotalCount }>
                <a href="#/cart">
                <Button type="success">购物车</Button>
                </a>
            </Badge>
        </div>
        <HashRouter>
            <Route exact path="/" component={ List } />
            <Route path="/cart" component={ Cart } />
        </HashRouter>
    </div>
);

// mapStateToProps方法负责将组件state里面的数据映射到组件的props属性上
// 方法会接收一个state参数，这个参数就是数据中心最新的值
const mapStateToProps = state =>{
    let fnCountTotal=()=>{
        let iTotalCount = 0;
        state.map(item=>{
            iTotalCount += item.num;
        });
        return iTotalCount;
    }
    return {
        iTotalCount:fnCountTotal()
    }
}



export default connect(mapStateToProps,null)(App);
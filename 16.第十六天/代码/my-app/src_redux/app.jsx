import React, { Component } from 'react';
import 'element-theme-default';
import { Button,Badge } from 'element-react';
import './static/css/main.css';
import banner from './static/images/banner.png';

import List from './list.jsx';
import Cart from './cart.jsx';

import { HashRouter,Route } from 'react-router-dom';

import store from './store';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            // 组件初始化时计算数据中心商品的数量
            iTotalCount:this.fnCountTotal()
        }

        // 订阅数据中心的修改
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    // 当数据中心的商品发生改变时，重新获取商品，计算商品数量
    fnStoreChange=()=>{
        this.setState({
            iTotalCount:this.fnCountTotal() 
        })
    }

    // 定义计算购物车商品总数的方法
    fnCountTotal=()=>{
        let aGoodsList = store.getState();
        let iTotalCount = 0;
        aGoodsList.map( item=>{
            iTotalCount += item.num;
        });
        return iTotalCount;
    }

    render() {
        return (
            <div className="main_wrap">
                <img src={ banner } alt="banner" className="banner" />
                <div className="menu">
                    <a href="#/">
                        <Button type="success">商品列表</Button>
                    </a>
                    
                    <Badge value={ this.state.iTotalCount }>
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
    }
}

export default App;
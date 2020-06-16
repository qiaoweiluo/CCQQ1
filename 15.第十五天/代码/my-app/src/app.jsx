import React, { Component } from 'react';
import 'element-theme-default';
import { Button,Badge } from 'element-react';
import './static/css/main.css';
import banner from './static/images/banner.png';

import List from './list.jsx';
import Cart from './cart.jsx';

import { HashRouter,Route } from 'react-router-dom';


class App extends Component {

    render() {
        return (
            <div className="main_wrap">
                <img src={ banner } alt="banner" className="banner" />
                <div className="menu">
                    <a href="#/">
                        <Button type="success">商品列表</Button>
                    </a>
                    
                    <Badge value={ 12 }>
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
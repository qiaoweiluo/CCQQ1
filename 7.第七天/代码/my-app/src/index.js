import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import App from './app.js'
// 导入全局样式重置
import './assets/css/reset.css';

// 导入rem设置的js
import './assets/js/set_root'

// 全局导入字体图标的样式
import './assets/css/iconfont.css';

// 全局引入antd-mobile样式
import 'antd-mobile/dist/antd-mobile.css';

// 导入基地址
import { BASE_URL } from './utils';

import axios from 'axios';

// 设置axios的基地址
axios.defaults.baseURL = BASE_URL;

// 将axio对象关联到组件类的原型对象上
// 这样，所有的组件上就会拥有axios对象的引用，可以直接使用
Component.prototype.axios = axios;


ReactDOM.render(<App />,document.getElementById('root'));
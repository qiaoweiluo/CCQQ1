// 导入创建store的方法
import { createStore } from 'redux';

// 导入数据仓库
import reducer from './reducer'

// 创建一个数据仓库管理员
let store = createStore( reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

export default store;
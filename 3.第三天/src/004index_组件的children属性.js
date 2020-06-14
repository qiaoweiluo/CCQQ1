import React, { Component } from 'react';
import ReactDOM from 'react-dom';
/*
    组件 children属性
    (1) 组件以标签使用时,可以用单标签,也可以用双标签
    (2) 双标签 在双标签中插入内容 组件的props属性上就有children属性 children属性值就是组件标签中间的内容
    children属性和props其他属性一样 可以是文本 jsx对象 函数 或者组件

*/
class App extends Component {
    render() {
        return (
            <div>
                {/* <div>显示children属性的内容{ this.props.children }</div> */}
                <input type="button" value="调用children对应的方法" onClick={ this.props.children } />

            </div>
        );
    }
}
// 在children属性中放一个字符串
// ReactDOM.render(<App>123</App>,document.getElementById('root'));

// 在children属性中放一个jsx对象
// ReactDOM.render(<App><h2>Hello world!</h2></App>,document.getElementById('root'));

// 在children属性中放一个方法
ReactDOM.render(<App>{ ()=>{ alert('Hello world!') } }</App>,document.getElementById('root'));

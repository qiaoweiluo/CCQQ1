import React from 'react';
import ReactDOM from 'react-dom';
// 从events模块中导入EventEmitter类
import { EventEmitter } from 'events'; // imd

// 002index_t通过bus对象实现兄弟组件传值

// 实例化EventEmitter的一个对象
// 通过实例的emit方法来发送数据
// 通过实例的on方法来接收数据。
// 类  构造函数的升级版 class声明一个类 对象 constructor定义属性 
let bus = new EventEmitter();
console.log(bus.__proto__);


class Father extends React.Component {
    render() {
        return (
            <div>
                <h1>这是父组件</h1>
                <Son />
                <Son2 />
            </div>
        )
    }
}

class Son extends React.Component {
    fnSend = () => {
        // 事件名称 go 数据 msg
        bus.emit('go', { 'msg': '我来自子组件一' });
    }

    render() {
        return (
            <div>
                <h2>这是子组件一</h2>
                <input type="button" value="发送数据给子组件二" onClick={this.fnSend} />
            </div>
        )
    }
}


class Son2 extends React.Component {
    // 要传参使用props 就需要 继承props属性
    constructor(props) {
        super(props);
        this.state = {
            msg: ''
        }
    }
    // 组件在挂载的页面之后会执行 一次
    // 绑定监听 接收数据
    componentDidMount() {
        bus.on('go', dat => {
            this.setState({
                msg: dat.msg
            })
        })
    }

    render() {
        return (
            <div>
                <h2>这是子组件二</h2>
                <p>显示来自子组件一的数据{this.state.msg}</p>
            </div>
        )
    }
}


ReactDOM.render(<Father />, document.getElementById('root'));



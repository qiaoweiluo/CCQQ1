// 002index_t通过bus对象实现兄弟组件传值
import React from 'react';
import ReactDOM from 'react-dom';

// 从events模块中导入EventEmitter类
import { EventEmitter } from 'events';

/*
    实例化EventEmitter的一个对象
    通过实例化的emit方法来发送数据
    通过实例化的on方法来接受数据
*/
let bus = new EventEmitter();


class Father extends React.Component {
    render() {
        return (
            <div>
                <h1>这是父组件</h1>
                <Son />
                <Son2 />
            </div>
        );
    }
}
class Son extends React.Component {
    fnSend = () => {
        // 事件名称 go 数据 msg 
        bus.emit('go', { 'msg': '我是来自子组件一' });
    }
    render() {
        return (
            <div>
                <h1>这是子组件一</h1>
                <input type="button" value="发送数据给子组件二" onClick={this.fnSend} />

            </div>
        );
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
    componentDidMount(){
        // 监听事件 go dat 返回一个对象
        bus.on('go',dat=>{
            this.setState({
                msg:dat.msg
            })
        })
    }
    render() {
        return (
            <div>
                <h1>这里是子组件二</h1>
                <p>显示来自子组件一的数据{this.state.msg}</p>
            </div>
        );
    }
}
ReactDOM.render(<Father />,document.getElementById('root'));


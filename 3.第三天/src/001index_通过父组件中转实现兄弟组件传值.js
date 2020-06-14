import React from 'react';
import ReactDOM from 'react-dom';
/*
    (1) 父传子
        1.父组件中子组件中取值 name={ this.state.name}
        2.子组件中接受值 {this.props.name}

    (2) 子传父
        1.子组件中定义点击事件传递一个数字10 onClick={()=>{this.props.fnSet(10)}}
        2.父组件中 子组件接受 fnSet={this.fnGetDate}
        3.父组件中执行另外一个函数 fnGetDate 传值 改变 state中的iNum值
    
    (3) 兄弟间传值(通过Son传值给父组件后其他兄弟取值)
        1.父组件中子组件中取值 iNum={ this.state.iNum}
        2.子组件中接受值 {this.props.iNum}
*/
class Father extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '我是父组件中的值', // 父传子
            iNum: 0                 // 子传父
        }
    }
    fnGetDate = (n) => {
        this.setState({ iNum: n })
    }
    render () {
        return (
            <div>
                <h1>这里是父组件</h1>
                <p>显示子组件传递过来的值: {this.state.iNum}</p>
                <Son name={this.state.name} fnSet={this.fnGetDate} />
                <Son2 iNum={this.state.iNum} />
            </div>
        );
    }
}

class Son extends React.Component {
    render () {
        return (
            <div>
                <h3>这是子组件一</h3>
                <p>显示父组件传递的值:{this.props.name}</p>
                <input type="button" value="传值给父组件" onClick={() => { this.props.fnSet(10) }} />
            </div>
        );
    }
}

class Son2 extends React.Component {
    render () {
        return (
            <div>
                <h3>这里是子组件二</h3>
                <p>显示子组件一传递过来的值:{this.props.iNum}</p>
            </div>
        );
    }
}
ReactDOM.render(<Father />, document.getElementById('root'));

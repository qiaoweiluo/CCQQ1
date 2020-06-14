import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
    render(){
        return (
            <div>
                {/* <div>显示children属性的内容{ this.props.children }</div> */}
                <input type="button" value="调用children对应的方法" onClick={ this.props.children } />
            </div>
        )
    }
}

// 在children属性中放一个字符串
//ReactDOM.render(<App>123</App>,document.getElementById('root'));

// 在children属性中放一个jsx对象
// ReactDOM.render(<App><h2>Hello world!</h2></App>,document.getElementById('root'));

// 在children属性中放一个方法
ReactDOM.render(<App>{ ()=>{ alert('Hello world!') } }</App>,document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            iNum:0
        }
    } 

    fnRendom=()=>{
        this.setState({
            // 将0-2直接的随机小数值向下取整
            iNum:Math.floor(Math.random()*2)
        })
    }

    render(){
        console.log('父组件更新了！');
        return (
            <div>
                <p>{ this.state.iNum }</p>
                <input type="button" value="生成随机数" onClick={ this.fnRendom } />
                <Son iNum={ this.state.iNum } />
            </div>
        )          
    }
}


class Son extends React.Component{
    // nextProps是shouldComponentUpdate的第一个参数，它里面存储的是props最新的值
    // 通过this.props可以拿到props的上一个值
    shouldComponentUpdate(nextProps){
       // console.log( this.props.iNum + ' | ' + nextProps.iNum )
        return !(this.props.iNum === nextProps.iNum)
    }   
    
    render(){
        console.log('子组件更新了！')
        return (
             <div>
                <p>这里是子组件，父组件传递的值：{ this.props.iNum }</p>
            </div>
        )          
    }
}

ReactDOM.render(<Father />,document.getElementById('root'));
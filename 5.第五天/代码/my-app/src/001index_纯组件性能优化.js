import React from 'react';
import ReactDOM from 'react-dom';

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            iNum:10
        }
    } 
    fnAdd=()=>{
        this.setState(state=>({iNum:state.iNum+1}))
    }

    render(){
        console.log('父组件更新了！');
        return (
            <div>
                <p>{ this.state.iNum }</p>
                <input type="button" value="递增" onClick={ this.fnAdd } />
                <Son />
            </div>
        )          
    }
}

//class Son extends React.Component{ 

// 使用继承纯组件的方式来创建组件：
// 这样的组件，如果父组件更新，子组件没有变化，子组件就不会更新
class Son extends React.PureComponent{   
    render(){
        console.log('子组件更新了！')
        return (
             <div>
                <p>这里是子组件</p>
            </div>
        )          
    }
}

ReactDOM.render(<Father />,document.getElementById('root'));
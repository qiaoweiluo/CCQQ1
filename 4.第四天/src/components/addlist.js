import React, { Component } from 'react';

class Addlist extends Component {
    constructor(props){
        super(props);
        this.state = {
            sTodo:''
        }
    }

    fnChange=(e)=>{
        this.setState({
            sTodo:e.target.value
        })
    }

    fnSetData=()=>{
        if( this.state.sTodo.trim()===''){
            alert('请输入计划内容！');
        }else{
            // 将sTodo的值传给父组件
            this.props.fnAdd( this.state.sTodo );
            // 同时清空输入框里面的值
            this.setState({
                sTodo:''
            })
        }
    }

    render() {
        return (
            <div>
                <input type="text" className="inputtxt" value={ this.state.sTodo } onChange={ this.fnChange } />
                <input type="button" value="增加" className="inputbtn" onClick={ this.fnSetData } />
            </div>
        );
    }
}

export default Addlist;
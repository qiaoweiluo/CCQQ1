import React, { Component } from 'react';

class Addlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sTodo: ''
        }
    }
    fnChange = (e) => {
        this.setState({ sTodo: e.target.value })
    }

    fnSetDate = () => {
        if (this.state.sTodo.trim() === '') {
            alert('请输入内容')
        } else {
            // 将sTodo的值传给父组件(传递一个携带参数的函数过去)
            this.props.fnAdd(this.state.sTodo);
            // 同时清空输入框里面的值
            this.setState({
                sTodo: ''
            })
        }
    }
    render() {
        return (
            <div>
                <input type="text" className="inputtxt" value={this.state.sTodo} onChange={this.fnChange} />
                <input type="button" value="增加" className="inputbtn" onClick={this.fnSetDate} />
            </div>
        );
    }
}

export default Addlist;
import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            // this.props 后面就是传的值
            // list组件只需要遍历 然后将列表和下标传出去
            <ul id="list" className="list">
                {
                    this.props.aList.map((item,i)=><li key={i}><span>{item}</span><b className="del" onClick={()=>{this.props.fnDel(i)}}>删除</b></li>)
                }                            
            </ul>
        );
    }
}

export default List;
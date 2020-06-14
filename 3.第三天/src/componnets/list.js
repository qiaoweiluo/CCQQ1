import React, { Component } from 'react';

class List extends Component {
    render() {
        return (
            <div>
                <ul id="list" className="list">
                    {/* this.props 后面就是传的值 */}
                    {/* list组件只需要遍历 然后将列表和下标传出去 */}
                    {
                        this.props.aList.map((item, i) => <li key={i}><span>{item}</span><a href="###" className="del" onClick={() => { this.props.fnDel(i) }}>删除</a></li>)
                    }
                </ul>
            </div>
        );
    } x
}

export default List;
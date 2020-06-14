import React from 'react';
import ReactDOM from 'react-dom';

// 导入类型校验模块
import propTypes from 'prop-types';

let aList = ['a','b','c'];


class App extends React.Component{
    
    render(){
        return (
            <div>
                <p>总共有{ this.props.iCount }条数据</p>
                <ul>
                    {
                        this.props.aList.map((item,i)=><li key={i}>{item}</li>)
                    }
                </ul>
            </div>
        )
    }
}

// 定义组件的类型校验
App.propTypes = {
    // iCount是数字，而且是必填项
    iCount:propTypes.number.isRequired,
    aList:propTypes.array
}


ReactDOM.render(<App iCount={3} aList={aList} />,document.getElementById('root'));
import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{    
    render(){
        return (
            <div>
                <p>每页显示{ this.props.iPageSize }条数据</p>
            </div>
        )
    }
}

// 设置组件props属性的默认值
App.defaultProps={
    iPageSize:10
}


ReactDOM.render(<App iPageSize={20} />,document.getElementById('root'));
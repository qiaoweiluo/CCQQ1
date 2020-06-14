import React from 'react';
import ReactDOM from 'react-dom';
import cat from './cat.jpg';


class Mouse extends React.Component{   
    constructor(props){
        super(props);
        this.state = {
            x: 0,
            y: 0 
        }
    } 
    fnGetMouse=(e)=>{
        this.setState({
            x:e.clientX,
            y:e.clientY
        })
    }
    // 组件在挂载的页面之后会执行一次
    componentDidMount(){
        window.addEventListener('mousemove',this.fnGetMouse)
    }

    // 在组件销毁之前删除事件绑定来优化组件
    componentWillUnmount(){
        window.removeEventListener('mousemove',this.fnGetMouse)
    }


    render(){
        // return <div>鼠标的x轴位置: {this.state.x},鼠标Y轴的位置: {this.state.y}</div>
    //    (1)
    //    return this.props.show( this.state );
    // (2)
    return this.props.children( this.state );

        
    }
}
// 定义一个显示一只猫的组件
function Cat(props){
    return <img src={ cat } alt="cat"style={ {'position':'fixed','left':props.x-40,'top':props.y-50} } />
}



// ReactDOM.render(<Mouse  />,document.getElementById('root'));
// (1).通过Mouse的props属性传进去一个方法show
// ReactDOM.render(<Mouse show={ function(mouse){ return <Cat x={ mouse.x } y={ mouse.y } />} } />,document.getElementById('root'));
// ES6简写 {...mouse} 相当于写成 x = mouse.x   y = mouse.y
// ReactDOM.render(<Mouse show={ mouse=> <Cat {...mouse} /> } />,document.getElementById('root'));
// (2) 把cat这个方法传到children属性上
ReactDOM.render(<Mouse>{ mouse=> <Cat {...mouse} /> }</Mouse>,document.getElementById('root'));

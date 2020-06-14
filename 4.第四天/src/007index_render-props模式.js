import React from 'react';
import ReactDOM from 'react-dom';
import cat from './cat.png';

// 定义一个可以获取鼠标位置的一个组件
class Mouse extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            x:0,
            y:0
        }
    }

    fnGetMouse=(e)=>{
        this.setState({
            x:e.clientX,
            y:e.clientY
        })
    }

    componentDidMount(){
        window.addEventListener('mousemove',this.fnGetMouse)
    }

    // 在组件销毁之前删除事件绑定来优化组件
    componentWillUnmount(){
        window.removeEventListener('mousemove',this.fnGetMouse)
    }
    
    render(){
       //  return <div>鼠标的x轴位置是：{ this.state.x },鼠标的y轴位置是：{ this.state.y }</div>
       // return this.props.show( this.state );
       return this.props.children( this.state );
    }
}


// 定义一个显示一只猫图片的组件
function Cat(props){
    return <img src={cat} alt="cat" style={ {'position':'fixed','left':props.x-40,'top':props.y-50} } />
}

// {...mouse} 相当于写成 x = mouse.x   y = mouse.y
//ReactDOM.render(<Mouse show={ mouse=><Cat {...mouse} /> } />,document.getElementById('root'));

ReactDOM.render(<Mouse>{ mouse=><Cat {...mouse} /> }</Mouse>,document.getElementById('root'));
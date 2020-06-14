import React from 'react';
import ReactDOM from 'react-dom';
import cat from './cat.png';

// 定义个高阶组件(HOC)
function withMouse(Comp){
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
            //return <Comp x={ this.state.x } y={ this.state.y } />
            // 加上{...this.props} 解决高阶组件props属性丢失的问题
            return <Comp {...this.state} {...this.props} />
        }
    }

    return Mouse
}

// 定义一个显示一只猫图片的组件
function Cat(props){
    return <img src={cat} alt={ props.myalt } style={ {'position':'fixed','left':props.x-40,'top':props.y-50} } />
}


// 使用高阶组件
let WithMouseCat = withMouse( Cat )
ReactDOM.render(<WithMouseCat myalt="这是一只猫" />,document.getElementById('root'));
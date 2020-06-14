import React from 'react';
import ReactDOM from 'react-dom';
import cat from './cat.jpg';
/*
    高阶组件(HOC)
    高阶组件是一个函数,他接受一个组件,返回增加了功能的组件
    高阶组件内部创建了一个组件,组件内部提供可复用的状态的逻辑
    传入的组件作为他的子组件,组件通过props属性将状态传递给这个子组件
    最终这个函数将组件返回
    返回的组件相当于是在传入的组件基础上增加了额外的功能

*/

// 定义一个高阶组件
// 命名规则 with
function withMouse(Com) {
    class Mouse extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                x: 0,
                y: 0
            }
        }

        fnGetMouse = (e) => {
            this.setState({
                x: e.clientX,
                y: e.clientY
            })
        }

        componentDidMount() {
            window.addEventListener('mousemove', this.fnGetMouse)
        }

        // 在组件销毁之前删除事件绑定来优化组件
        componentWillUnmount() {
            window.removeEventListener('mousemove', this.fnGetMouse)
        }

        render() {
            // return <Comp x={ this.state.x } y={ this.state.y } />

            // return <Com {...this.state } />

            // 加上 {...this.props} 解决高阶组件props属性丢失的问题
            return <Com {...this.state} {...this.props} />
        }
    }

    return Mouse
}

// 定义一个显示一只猫图片的组件
function Cat(props) {
    return <img src={cat} alt={props.myalt} style={{ 'position': 'fixed', 'left': props.x - 40, 'top': props.y - 50 }} />
}

// 使用高阶组件
let WithMouseCat = withMouse(Cat)
// ReactDOM.render(<Cat myalt='这是一只猫' />,document.getElementById('root'));
// 直接传入Cat组件 可以拿到传入的alt属性

// 为了保证传入的属性不丢失  可以 在这里传入 就相当于调用的 withMouse(Cat) 函数
ReactDOM.render(<WithMouseCat myalt='这是一只猫' />, document.getElementById('root'));

/*
    使用高阶组件props丢失的问题
    在使用高阶组件时,如果传入的props属性,组件中会接受不到这个属性
    <WithMouseCat myalt='这是一只猫' />
    如果要组件接受到这个属性,需要在高阶组件中加上props属性,将父组件的props属性也传给子组件
    return <Com {...this.state} {...this.props} />
    这时候 就可以在包裹的组件中使用这个属性了
    return <img src={cat} alt={props.myalt} style={{ 'position': 'fixed', 'left': props.x - 40, 'top': props.y - 50 }} />
*/
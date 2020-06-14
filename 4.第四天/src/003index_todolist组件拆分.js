import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import List from './components/list';
import Addlist from './components/addlist.js'
/*
    前面的todolist可以拆分成三个组件:
    (1) 整体组件: 负责整体列表数据的存储和数据交互方法
    (2) 增加计划组件: 负责增加计划内容的交互操作
    (3) 计划展示列表组件: 负责计划的展示
*/

class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            aList:['学习html','学习css','学习javascript']
        }
    }
    fnAdd=(sTr)=>{
        this.setState(state=>{
            return {
                aList:[...state.aList,sTr],
                sTodo:''
            }
        })
    }
    fnDel=(i)=>{
        this.setState(state=>{
           let aNewList = state.aList;
           //  从第i个成员开始操作数组，删除一个成员
           aNewList.splice(i,1);

           return {
               aList:aNewList
           }
        })
    }

    render(){
        let { aList } = this.state;
        return (
            <div className="list_con">
                <h2>To do list</h2>
                {/* fnAdd是子组件传过来的  this.fnAdd是父组件的方法 */}
                <Addlist fnAdd={ this.fnAdd } />   

                {/* fnDel  this.fnDel是父组件的方法 可以同名*/}
                <List aList={ aList } fnDel={ this.fnDel }  />
            </div>
        )
    }
}

ReactDOM.render(<Todolist />,document.getElementById('root'));



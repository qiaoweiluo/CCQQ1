import React from 'react';
import ReactDOM from 'react-dom';
import './main.css';
import axios from 'axios';

// 导入数据仓库管理员
import store from './store';

import {CHANGE_VAL, ADD_LIST, DEL_LIST,INIT_DATA} from './store/action_type'

class Todolist extends React.Component{
    constructor(props){
        super(props);
        this.state = store.getState();

        // 组件在初始化的时候订阅数据中心的修改
        // 数据中心修改时，会触发订阅中指定的方法
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    // 定义订阅数据中心修改触发的方法
    // 这个方法会去数据中心重新拿一次数据，并且把这个数据设置到state中
    fnStoreChange=()=>{
        this.setState( store.getState() )
    }

    // 在组件销毁之前取消数据中心的订阅，从而优化组件
    componentWillUnmount(){
        this.unsubscribe();
    }

    componentDidMount(){
        axios.get('/data.json').then(dat=>{
            //console.log(dat.data);
            store.dispatch({
                type:INIT_DATA,
                value:dat.data
            })

        })
    }

    fnChange=(e)=>{
        // 创建一个修改数据的工单
        let action = {
            type:CHANGE_VAL,
            value:e.target.value
        }

        // 提交工单
        store.dispatch( action );
    }

    fnAdd=()=>{
        // 创建一个修改数据列表的工单
        /*  
            let action = {
                type:'add_list'
            } 
        */
        // 提交工单
        /* 
            store.dispatch(action) 
        */
        
        // 上面的两句话可以合并成下面的写法：
        store.dispatch({
            type:ADD_LIST
        }) 

    }

    fnDel=(i)=>{
        store.dispatch({
            type:DEL_LIST,
            value:i
        })
    }

    render(){
        let { aList,sTodo } = this.state;
        return (
            <div className="list_con">
                <h2>To do list</h2>
                <input type="text" value={ sTodo } className="inputtxt" onChange={ this.fnChange } />
                <input type="button" name="" value="增加" id="btn1" className="inputbtn" onClick={this.fnAdd } />
                
                <ul id="list" className="list">
                    {
                        aList.map((item,i)=><li key={i}><span>{item}</span><b  className="del" onClick={()=>{ this.fnDel(i) }  }>删除</b></li>)
                    }                   
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Todolist />,document.getElementById('root'));
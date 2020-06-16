import {CHANGE_VAL, ADD_LIST, DEL_LIST,INIT_DATA} from './action_type'

// 定义数据仓库的初始值
let oDefaultState = {
    aList:[],
    sTodo:''
}

// 定义一个名称为reducer的函数
let reducer = (state=oDefaultState,action)=>{
    // 接收一个工单
    if(action.type===CHANGE_VAL){
        // 将state对象深拷贝一份
        let oNewState = JSON.parse( JSON.stringify( state ) );
        oNewState.sTodo = action.value;

        // 返回一个新的对象，这个时候，数据仓库里面的数据就改成了这个新的数据了
        return oNewState;        
    }

    // 接收一个工单
    if(action.type===ADD_LIST){
        // 将state对象深拷贝一份
        let oNewState = JSON.parse( JSON.stringify( state ) );
        
        // 判断输入框的值( STodo )是否为空
        if(oNewState.sTodo.trim()===''){
            alert('请输入计划内容！');
            //如果输入框里面只有空格，这么操作可以清空输入框的内容
            oNewState.sTodo='';
            return oNewState            
        }else{
            oNewState.aList.push( oNewState.sTodo.trim() );
            // 清空输入框的值
            oNewState.sTodo = '';
            return oNewState;
        }     
    }

    // 接收一个工单
    if(action.type===DEL_LIST){
        // 将state对象深拷贝一份
        let oNewState = JSON.parse( JSON.stringify( state ) );
        oNewState.aList.splice(action.value,1)
        return oNewState;      
     
    }

    // 接收一个工单
    if(action.type===INIT_DATA){        
        return action.value;
    }

    return state;
}

export default reducer;
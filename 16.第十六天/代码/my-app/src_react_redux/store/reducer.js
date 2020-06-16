let reducer = (state=[],action)=>{
    // 加入购物车操作
    if(action.type==='add_goods'){
        let oNewState = JSON.parse( JSON.stringify( state ) );
        let oFiderGoods = oNewState.find( item=>item.id===action.value.id )
        if( oFiderGoods ){
            oFiderGoods.num += 1;
        }else{
            oNewState.push( action.value ); 
        }           
        return oNewState;
    }

    // 购物车商品数量加减操作
    if(action.type==='change_goods_num'){
        let oNewState = JSON.parse( JSON.stringify( state ) );        
        let oFiderGoods = oNewState.find( item=>item.id===action.id);
        oFiderGoods.num = action.value;
        return oNewState;
    }

     // 删除商品
     if(action.type==='del_goods'){
        let oNewState = JSON.parse( JSON.stringify( state ) );        
        let oFilterData = oNewState.filter(item=>item.id!==action.id);
        return oFilterData; 
    }

    return state;
}

export default reducer;
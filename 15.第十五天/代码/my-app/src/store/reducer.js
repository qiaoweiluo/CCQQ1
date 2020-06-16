let reducer = (state=[],action)=>{
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

    return state;
}

export default reducer;
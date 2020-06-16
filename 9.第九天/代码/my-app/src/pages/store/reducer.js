
let reducer = (state={},action)=>{
    if(action.type==='change_city'){
        return action.value;
    }
    return state;
}

export default reducer;
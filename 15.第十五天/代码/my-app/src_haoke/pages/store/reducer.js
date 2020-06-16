
let reducer = (state={label: "深圳", value: "AREA|a6649a11-be98-b150"},action)=>{
    if(action.type==='change_city'){
        return action.value;
    }
    return state;
}

export default reducer;
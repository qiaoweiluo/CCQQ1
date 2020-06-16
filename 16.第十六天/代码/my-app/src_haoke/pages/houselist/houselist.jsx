import React, { Component } from 'react';
import './houselist.css';
import { withRouter } from 'react-router-dom';
import City from '../city/city';
import store from '../store';

import { PickerView,Toast } from 'antd-mobile';

import {List,AutoSizer,InfiniteLoader} from 'react-virtualized';

import { BASE_URL } from '../../utils';

import notfound from '../../assets/images/not-found.png'



class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            sCurrentCityName:store.getState().label,
            sClass:'city_wrap'
        }
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    fnStoreChange=()=>{
        this.setState({
            sCurrentCityName:store.getState().label
        })
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    fnShowCity=(sClass)=>{
        this.setState({
            sClass
        })
    }

    render(){
        return (
            <div className="list_title">
                <span className="back iconfont icon-prev" onClick={()=>this.props.history.goBack() }></span>
                <div className="search_con">
                    <span className="city"  onClick={()=>{ this.fnShowCity('city_wrap slideUp') }  }>{ this.state.sCurrentCityName }</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <span className="village"><i className="iconfont icon-fangdajing"></i> 请输入小区名</span>
                </div>
                <i className="iconfont icon-ic-maplocation-o tomap" onClick={()=>this.props.history.push('/map') }></i>
                <City sClass={this.state.sClass} fnShowCity={ this.fnShowCity } />
            </div>
        )
    }
}



class FilterBar extends Component{
    constructor(props){
        super(props);
        this.state = {
            // 获取当前城市
            oCurrentCity:store.getState(),
            // 循环生成过滤条的数据
            aFilterData:[
                {title:'区域',type:'area'},
                {title:'方式',type:'mode'},
                {title:'租金',type:'price'},
                {title:'筛选',type:'more'}
            ],
          
            // 控制pickview弹框的显示
            bShowPickView:false,
            // 控制tags弹框的显示
            bShowTags:false,
            // 存储当前的类型
            sCurrentType:'',
            // 定义变量来存储整体的过滤数据
            oAllFilterData:{},
            // 定义变量来存储当前pickview组件的数据
            aCurrentFilterData:[],
            // 存储当前pickview的列数
            iCols:1,
            // 存储右侧tags过滤数据
            aTagsFilterData:[],
            // 定义变量存储过滤弹框里面所有选择的值
            oAllFilterVal:{
                'area':["area", "null"],
                'mode':['null'],
                'price':['null'],
                'more':[]
            },
             // 定义变量来控制过滤条文字的高亮状态
            oFilterState:{
                'area':false,
                'mode':false,
                'price':false,
                'more':false
            }
        }

        this.unsubscribe = store.subscribe( this.fnStoreChange )

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    fnStoreChange=()=>{
        this.setState({
            oCurrentCity:store.getState(),
            oAllFilterVal:{
                'area':["area", "null"],
                'mode':['null'],
                'price':['null'],
                'more':[]
            },
            oFilterState:{
                'area':false,
                'mode':false,
                'price':false,
                'more':false
            }
        },()=>{
            this.fnGetFilterData()
        })
    }

    /* 
        目前的数据格式：
        {
            'area':["area", "null"],
            'mode':['null'],
            'price':['null'],
            'more':[]
        }
        需要的数据格式
         {
            'area':"null"  或者是： 'subway':'null' 或者是： 'area':"AREA|acdacb70-3025-74c3"
            'rentType':'null',  或者是： 'rentType':'true'
            'price':2000,  或者是： 'price':'null'
            'more':'AREA|acdacb70-3025-74c3,AREA|acdacb70-3025-74c3,AREA|acdacb70-3025-74c3'
        }    
    */

    fnSetParams=()=>{
        let oNowFilterVal = this.state.oAllFilterVal;
        let oParams = {};

        if( oNowFilterVal.area[2]===undefined ){
            oParams[ oNowFilterVal.area[0] ] = oNowFilterVal.area[1]
        }else if( oNowFilterVal.area[2]==='null' ){
            oParams[ oNowFilterVal.area[0] ] = oNowFilterVal.area[1]
        }else{
            oParams[ oNowFilterVal.area[0] ] = oNowFilterVal.area[2]
        }

        oParams.rentType = oNowFilterVal.mode[0];

        if( oNowFilterVal.price[0]==='null' ){
            oParams.price = 'null'
        }else{
            oParams.price = oNowFilterVal.price[0].split('|')[1];
        }
        oParams.more = oNowFilterVal.more.join(',');

        this.props.fnGetHouseListData( oParams );

        this.fnHidePops();

        //console.log( oParams );
    }



    // 定义方法来改变过滤条的文字是否高亮
    fnChangeFilterState=()=>{
        this.setState(state=>{
            let oNowFilterState = state.oFilterState;
            let oNowAllFilterVal = state.oAllFilterVal;

            if(oNowAllFilterVal.area[0]==='area' && oNowAllFilterVal.area[1]==='null'){
                oNowFilterState.area = false;
            }else{
                oNowFilterState.area = true;
            }

            if(oNowAllFilterVal.mode[0]==='null'){
                oNowFilterState.mode = false;
            }else{
                oNowFilterState.mode = true;
            }

            if(oNowAllFilterVal.price[0]==='null'){
                oNowFilterState.price = false;
            }else{
                oNowFilterState.price = true;
            }

            if(oNowAllFilterVal.more.length===0){
                oNowFilterState.more = false;
            }else{
                oNowFilterState.more = true;
            }

            return {
                oFilterState:oNowFilterState
            }

        })
    }


    componentDidMount(){
        this.fnGetFilterData()
    }

    fnGetFilterData=async ()=>{
        let oRes = await this.axios.get('/houses/condition?id='+ this.state.oCurrentCity.value );
        this.setState({
            oAllFilterData:oRes.data.body
        },()=>{
            let { roomType,oriented,floor,characteristic } = this.state.oAllFilterData;
            this.setState({
                aTagsFilterData:[
                    {title:'户型',data:roomType},
                    {title:'朝向',data:oriented},
                    {title:'楼层',data:floor},
                    {title:'房屋亮点',data:characteristic}
                ]
            })

        })
        //console.log(oRes.data.body);
    }

    // 定义显示弹框的方法
    fnShowPops=(sType)=>{
        if(sType!=='more'){

             // 分割oAllFilterData里面数据，放到aCurrentFilterData数组中
             let { area,subway,price,rentType } = this.state.oAllFilterData;
             let aNowFilterData = [];
             let iCols = 1;
 
             if( sType==='area' ){
                 aNowFilterData = [area,subway];
                 iCols = 3
             }else if(sType==='mode' ){
                 aNowFilterData = rentType
             }else{
                 aNowFilterData = price
             }
 
             this.setState({
                 bShowPickView:true,
                 bShowTags:false,
                 sCurrentType:sType,
                 aCurrentFilterData:aNowFilterData,
                 iCols
             })
           
        }else{
            this.setState({
                bShowPickView:false,
                bShowTags:true,
                sCurrentType:sType
            })
        }      
    }
    // 隐藏两个弹框的方法
    fnHidePops=()=>{
        this.setState({
            bShowPickView:false,
            bShowTags:false,
            sCurrentType:''
        })
    }

    // 定义获取pickview选中的值的方法
    fnGetVal=(val)=>{
        console.log(val);
        this.setState(state=>{
            let oNowFilterVal = state.oAllFilterVal;
            oNowFilterVal[state.sCurrentType] = val;
            return {
                oAllFilterVal:oNowFilterVal
            }
        },()=>{
            //console.log( this.state.oAllFilterVal )
            // 在回调中调用改变过滤条文字高亮的方法
            this.fnChangeFilterState()
        })
    }

    // 定义获取右侧tags弹框选中的值的方法
    fnGetTagsVal=(val)=>{
        this.setState(state=>{
            let oNowFilterVal = state.oAllFilterVal;
            // 将数组复制一份
            let aNowTagsVal = [...oNowFilterVal.more];

            // 判断数组中是否包含传入的val
            if( aNowTagsVal.includes(val) ){
                // 如果包含，就从数组中过滤出这个val，得到一个不包含val的数组
                aNowTagsVal = aNowTagsVal.filter(item=>item!==val)
            }else{
                // 如果不包含，就将这个val加到数组中
                aNowTagsVal.push( val )
            }

            oNowFilterVal.more = aNowTagsVal;

            return {
                oAllFilterVal:oNowFilterVal
            }           
        },()=>{
            //console.log( this.state.oAllFilterVal )
            // 在回调中调用改变过滤条文字高亮的方法
            this.fnChangeFilterState()
        })
    }

    render(){
        let {
            aFilterData,    // 循环生成过滤条的数据
            bShowPickView,  // 控制pickview弹框的显示
            bShowTags,      // 控制tags弹框的显示
            sCurrentType,    // 存储当前的类型
            aCurrentFilterData, // 存储当前pickview组件的数据
            iCols,  // 存储当前pickview的列数
            aTagsFilterData,  // 存储右侧tags过滤数据
            oAllFilterVal,   // 定义变量存储过滤弹框里面所有选择的值
            oFilterState   // 定义变量来控制过滤条文字的高亮状态
        } = this.state;

        return (
            <>
                <ul className="filter_list">
                    {
                        aFilterData.map(item=>(
                            <li className={((sCurrentType===item.type)?"current ":"")+((oFilterState[item.type])?"active":"")} key={ item.type } onClick={()=>this.fnShowPops( item.type ) }>
                                <span>{item.title}</span>
                                <i className="iconfont icon-xialajiantouxiangxia"></i>
                            </li>
                        ))
                    }                 
                   
                </ul>

                {/*  pickview弹框结构  */}
                <div className={bShowPickView?"slide_pannel pannel_in":"slide_pannel pannel_out"}>
                    <div className="slide_comp">
                        <PickerView
                            data={aCurrentFilterData}
                            // 是否级联
                            cascade={true}
                            cols = { iCols }
                            onChange = { this.fnGetVal }
                            value = { oAllFilterVal[sCurrentType] }
                        />
                    </div>
                    <div className="slide_btns">
                        <span onClick={ this.fnHidePops }>取消</span>
                        <b onClick={ this.fnSetParams }>确定</b>
                    </div>
                </div>
                <div className={bShowPickView?"mask mask_in":"mask mask_out"}  onClick={ this.fnHidePops }></div>

                {/*  tags弹框结构  */}
                <div className={bShowTags?"tags_pannel tags_pannel_in":"tags_pannel tags_pannel_out"}>
                    <div className="tags_list">
                        {
                            aTagsFilterData.map(item=>(
                                <div key={ item.title }>
                                    <h3>{ item.title }</h3>
                                    <div className="ul_wrap">
                                        <ul>
                                            {
                                                item.data.map(val=><li 
                                                    key={ val.value } 
                                                    onClick={()=>this.fnGetTagsVal( val.value ) }
                                                    className={( oAllFilterVal.more.includes( val.value ) )?"active":""}
                                                    >{val.label}</li>)
                                            }
                                        </ul>
                                    </div> 
                                </div>
                            ))
                        }                                         
                 
                    </div>
                    <div className="tags_btns">
                        <span onClick={ this.fnHidePops }>取消</span>
                        <b onClick={ this.fnSetParams }>确定</b>
                    </div>
                </div>    
                <div  className={bShowTags?"mask2 mask_in":"mask2 mask_out"} onClick={ this.fnHidePops }></div> 
        
            </>
        )
    }
}



let WithsearchBar = withRouter( SearchBar );

class Houselist extends Component{
    constructor(props){
        super(props);
        this.state = {
            oCurrentCity:store.getState(),
            // 存储房屋列表数据
            aHouseList:[],
            // 存储返回房屋列表的总条数
            iCount:0,
            // 此变量表示数据是否加载完
            bIsloaded:false
        }
        this.params = {}
        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    fnStoreChange=()=>{
       this.setState({
            oCurrentCity:store.getState()
       },()=>{
            this.fnGetHouseListData({})
       })
    }

    componentDidMount(){
        this.fnGetHouseListData({})
    }


    fnGetHouseListData=async params=>{
        // 将传入的过滤参数存储到this的params上
        this.params = params;
        Toast.loading('加载中...',0);
        let oRes = await this.axios.get('/houses',{
            params:{
                ...params,
                cityId:this.state.oCurrentCity.value,
                start:1,
                end:20
            }
        });

        Toast.hide();

        //console.log( oRes.data.body );
        this.setState({
            aHouseList:oRes.data.body.list,
            iCount:oRes.data.body.count,
            bIsloaded:true

        },()=>{
            // 用一定的条件请求数据，数据回来之后，将List组件滚动到第一条
            this.list.scrollToRow(0);
        })
    }
    
    rowRenderer=({key,index,style})=>{
        let oHouseList = this.state.aHouseList[index];

        // 当index对应的房屋数据还没有时，oHouseList的值就是undefined
        // 下面定义的就是没有值时的替换结构，否则程序会报错。
        if( !oHouseList ){
            return <div className="reload" key={key} style={ style }><div>loading....</div></div>
        }

        return (
            <div className="house_wrap" key={ key } style={ style } onClick={()=>this.props.history.push('/detail/'+oHouseList.houseCode ) }>
                <div className="house_item">
                    <div className="imgWrap">
                        <img className="img" src={ BASE_URL+ oHouseList.houseImg} />
                    </div>
                    <div className="content">
                        <h3 className="title">{ oHouseList.title }</h3>
                        <div className="desc">{oHouseList.desc}</div>
                        <div>
                            {
                                oHouseList.tags.map((item,i)=><span className={"tag tag"+i} key={i}>{item}</span>)
                            }
                        </div>
                        <div className="price">
                            <span className="priceNum">{oHouseList.price}</span> 元/月
                        </div>
                    </div>
                </div>
            </div>
        )
   }

    // InfiniteLoader组件中用来判断某一行是否加载的方法
    // 是固定写法，内部的作用原理不用去管
    isRowLoaded = ({ index })=> {
        return !!this.state.aHouseList[index];
    }
    // 定义加载更多数据的方法
    loadMoreRows=({ startIndex, stopIndex })=>{
        return this.axios.get('/houses',{
            params:{
                ...this.params,
                cityId:this.state.oCurrentCity.value,
                start:startIndex,
                end:stopIndex
            }
        }).then(dat=>{
            //console.log(dat);
            // 将返回的数据增加到原来的aHouseList中
            this.setState(state=>{
                return {
                    aHouseList:[...state.aHouseList,...dat.data.body.list],
                    iCount:dat.data.body.count
                }
            })
        })
    }     
    render() {
        return (
            <div>
                <WithsearchBar />
                <FilterBar fnGetHouseListData={ this.fnGetHouseListData } />
                <div className="house_list_con">
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    loadMoreRows={this.loadMoreRows}
                    rowCount={this.state.iCount}
                >
                    {({ onRowsRendered, registerChild }) => (
                    <AutoSizer>
                        {({height, width}) => (
                        <List
                            // list参数就代表List组件对象
                            ref={(list)=>{
                                // 将List组件对象绑定到this上，那么在方法中就可以用this.list来调用List组件了
                                this.list = list;
                                // 将list对象传给通过registerChild方法传递给InfiniteLoader内部使用
                                registerChild(list);
                            }}
                            onRowsRendered={onRowsRendered}
                            width={width}
                            height={height}
                            rowCount={ this.state.iCount }
                            rowHeight={120}
                            rowRenderer={this.rowRenderer}
                        />                    
                        )}
                    </AutoSizer>
                    )}
                    </InfiniteLoader>                    
                    {
                        (this.state.aHouseList.length===0 && this.state.bIsloaded) && <div className="notfound">
                            <img src={notfound} alt="未找到" />
                            <p>没有找到房源，请你换个搜索条件吧~</p>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Houselist;
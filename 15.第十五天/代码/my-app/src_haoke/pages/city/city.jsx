import React, { Component } from 'react';
import './city.css';
import store from '../store';

// 导入可视区渲染的组件
import {List,AutoSizer} from 'react-virtualized';

// 导入弹框组件
import { Toast } from 'antd-mobile';

/* 
    当前返回的城市列表数据：
    [
        {label: "北京", value: "AREA|88cff55c-aaa4-e2e0", pinyin: "beijing", short: "bj"},
        {label: "安庆", value: "AREA|b4e8be1a-2de2-e039", pinyin: "anqing", short: "aq"},
        {label: "南宁", value: "AREA|2bc437ca-b3d2-5c3c", pinyin: "nanning", short: "nn"},
        {label: "长沙", value: "AREA|98b03413-6f84-c263", pinyin: "changsha", short: "cs"},
        {label: "武汉", value: "AREA|27e414ce-a7e1-fd99", pinyin: "wuhan", short: "wh"},
        {label: "重庆", value: "AREA|df130a14-79a9-a2ca", pinyin: "zhongqing", short},
        .......
    ]

    需要的数据格式：
    {
        A:[{label: "安庆", value: "AREA|b4e8be1a-2de2-e039", pinyin: "anqing", short: "aq"}],
        B:[{label: "宝鸡", value: "AREA|d67f3282-dfc6-a687", pinyin: "baoji", short: "b},{label: "保定", value: "AREA|d67f3282-dfc6-a687", pinyin: "baoding", short: "bd"}],
        C:[ {label: "长沙", value: "AREA|98b03413-6f84-c263", pinyin: "changsha", short: "cs"},{label: "重庆", value: "AREA|df130a14-79a9-a2ca", pinyin: "zhongqing", short}]
    }
    ['#','hot','A','B','C','D'......]

*/

// 定义格式化数据的方法
function fnFormatData(aList){
    let oCityList = {};
    aList.map(item=>{
        // 获取城市名称的首字母，作为oCityList对象的key
        let sLetter = item.short.substr(0,1);
        // 通过 key in obj 来判断对象中是否包含某个键
        if(sLetter in oCityList){
            oCityList[sLetter].push(item);
        }else{
            oCityList[sLetter] = [item];
        }
    })

    // Object.keys方法可以将对象里面的键拿出来生成一个数组
    // sort() 方法将数组排序
    let aCityKey = Object.keys( oCityList ).sort()

    return {
        oCityList,
        aCityKey
    }

}

function fnFormatName(str){
    if(str==='#'){
        return '当前城市'
    }else if(str==='hot'){
        return '热门城市'
    }else{
        return str.toUpperCase()
    }
}

class City extends Component {
    constructor(props){
        super(props);
        this.state = {
            oCityList:{},
            aCityKey:[],
            oCurrentCity:store.getState(),
            // 定义变量存储当前列表滚动到那个行的索引值
            iCurrent:0
        }

        // 创建一个ref对象来关联List组件，方便我们在方法中调用List组件的方法
        this.oRef = React.createRef();
        this.unsubscribe = store.subscribe( this.fnStoreChange );

        // 在组件上绑定一个布尔值来控制滚动设置右侧的索引值是否生效
        this.bIsScrolling= true;
    }

    fnStoreChange=()=>{
        this.setState({
            oCurrentCity:store.getState()
        },()=>{
            // 在setState回调函数中去设置oCityList可以保证oCurrentCity是最新的当前城市
            // 将oCityList里面#对应的当成城市也改成点击设置的当前城市
            this.setState(state=>{
                let oNowCityList = state.oCityList;
                oNowCityList['#'] = [state.oCurrentCity];
                return {
                    oCityList:oNowCityList
                }
            })
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    componentDidMount(){
        this.fnGetData();
    }

    fnGetData=async ()=>{
        let sCityList = localStorage.getItem('haoke_city_list');
        let oNowCityList = {};
        if( sCityList ){
            oNowCityList = JSON.parse( sCityList )
        }else{
            let oRes = await this.axios.get('/area/city?level=1');
            localStorage.setItem('haoke_city_list',JSON.stringify( oRes.data.body )); 
            oNowCityList = oRes.data.body
        }
             
        //console.log(oRes.data.body);
        // 得到所有城市列表数据
        let {oCityList, aCityKey}= fnFormatData( oNowCityList );
        

        // 加上热门城市数据
        let sHotCityList = localStorage.getItem('haoke_hot_city_list');
        let oNowHotCityList = {};
        if( sHotCityList ){
            oNowHotCityList = JSON.parse( sHotCityList )
        }else{
            let oRes2 = await this.axios.get('/area/hot');
            localStorage.setItem('haoke_hot_city_list',JSON.stringify( oRes2.data.body )); 
            oNowHotCityList = oRes2.data.body
        }     


        oCityList['hot'] = oNowHotCityList;
        aCityKey.unshift('hot');

        // 加上当前城市
        oCityList['#'] = [this.state.oCurrentCity];
        aCityKey.unshift('#');

        //console.log(oCityList,aCityKey);

        this.setState({
            oCityList,aCityKey
        })

    }


  
   // 定义List组件渲染结构的方法
   // key是List组件自动生成的key，index是List组件传入的索引值，每次传一个值，值的范围是从0  到 aCityKey.length-1
   // style是List组件生成的样式，这个样式属性必须加上
   rowRenderer=({key,index,style})=>{
        // 通过传入的index索引值从aCityKey数组中拿到对应的key
        //console.log(index);
        let sLetter = this.state.aCityKey[index];
        //console.log(sLetter);

        // 通过key在oCityList拿到城市的列表数据
        let aCityList = this.state.oCityList[sLetter];

        return (
            <div className="city_group" key={ key } style={ style }  >
                <h4>{ fnFormatName(sLetter) }</h4>
                <ul>
                    {
                        aCityList.map(val=><li key={ val.value } onClick={ ()=>this.fnChangeCity( val.label ) }>{val.label}</li>) 
                    }                                    
                </ul>
            </div>
        )
   }


   // 定义改变当前城市的方法
   fnChangeCity=async sName=>{
       //alert(sName);
       // 判断点击的城市是否是当前城市
       if(sName===this.state.oCurrentCity.label){
            Toast.info('当前城市已选！',2);
            return;
       }

       let sNowCurrentCity = localStorage.getItem('haoke_test_city'+sName);
       let oNowCurrentCity = {};
       if( sNowCurrentCity ) {
          oNowCurrentCity = JSON.parse( sNowCurrentCity )
       }else{
          // 将选择的城市名称传入一个借口，研究这个城市是否在公司业务范围内
          let oRes = await this.axios.get('/area/info?name='+sName);
          localStorage.setItem('haoke_test_city'+sName, JSON.stringify( oRes.data.body ));
          oNowCurrentCity = oRes.data.body;
       }       
       
       // console.log(oRes.data.body);

       // 如果传入的城市名称不是上海，但是返回的城市数据是上海的数据
       // 说明当前城市不再公司业务范围内，那么就提示用户没有这个城市的数据，然后不做操作
       if( sName!=='上海' && oNowCurrentCity.label==='上海' ){
          Toast.info('当前城市没有数据，请换一个城市！',2);
       }else{

        // 如果点击的城市名称在公司范围内，就将点击的城市数据存储到数据中心，同时存储到sessionStorage
        store.dispatch({
            type:'change_city',
            value:oNowCurrentCity
        });        

        sessionStorage.setItem('haoke_current_city', JSON.stringify( oNowCurrentCity ) )

        // 同时关闭城市列表
        this.props.fnShowCity('city_wrap');
    }


   }


   // 定义计算每一行高度的方法
   rowHeightCount=({index})=>{
      // 通过传入的index索引值从aCityKey数组中拿到对应的key
      let sLetter = this.state.aCityKey[index];
      // 通过key在oCityList拿到城市的列表数据的成员个数
      let iLen = this.state.oCityList[sLetter].length;
      return 40 + 58*iLen
   }

   // 定义点击字母滚动到对应行的方法
   fnScrollToRow=(i)=>{
        this.bIsScrolling = false;
       // 让List组件滚动到索引值i对应的行那里
        this.oRef.current.scrollToRow( i );
        // 将右侧第i个字母设置成高亮
        this.setState({
            iCurrent:i
        })
        setTimeout(()=>{
            this.bIsScrolling = true;
        },200);
   }
   // 定义列表滚动时关联触发的方法
   onRowsRendered=({startIndex})=>{
        //console.log(startIndex);
        if( this.bIsScrolling ){
            this.setState({
                iCurrent:startIndex
            }) 
        }       
   }

   onScroll=({scrollHeight,scrollTop,clientHeight})=>{
       //console.log(scrollHeight + ' | ' + (scrollTop +  clientHeight));       
       // scrollHeight表示整个列表的高度，scrollTop表示已经滚动过去的高度，clientHeight表示滚动可视区的高度
       // 当滚动到最底部的时候
       if( (scrollHeight - (scrollTop +  clientHeight))< 1  ){
           this.setState({
                iCurrent:this.state.aCityKey.length-1
           })
       }
   }

    render() {
        let { iCurrent,aCityKey } = this.state;
        return (
            <div className={ this.props.sClass }>
                <div className="city_title">
                    <span className="shutoff iconfont icon-shut" onClick={()=>{ this.props.fnShowCity('city_wrap') }}></span>
                    <h3>选择城市</h3>
                </div>        
                <div className="group_con">
                <AutoSizer>
                    {({height, width}) => (
                    <List
                        ref={ this.oRef }
                        width={width}
                        height={height}
                        rowCount={aCityKey.length}
                        rowHeight={this.rowHeightCount}
                        rowRenderer={this.rowRenderer}
                        // 设置滚动的行按照定格对齐
                        scrollToAlignment='start'
                        // 定义列表滚动时关联的方法
                        onRowsRendered={ this.onRowsRendered }
                        // 定义列表滚动时关联的方法
                        onScroll = { this.onScroll }
                    />                    
                    )}
                </AutoSizer>

                </div>
                <ul className="city_index">
                    {
                        aCityKey.map((item,i)=><li className={ (iCurrent===i)?'active':'' } key={ item } onClick={()=>this.fnScrollToRow(i)}><span>{ item==='hot'?'热':item.toUpperCase() }</span></li>)
                    }                    
                  
                </ul>
            </div>
        );
    }
}

export default City;
import React, { Component } from 'react';
import './city.css';
import store from '../store';

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
    ['A','B','C','D'......]

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
            oCurrentCity:store.getState()
        }

        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    fnStoreChange=()=>{
        this.setState({
            oCurrentCity:store.getState()
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    componentDidMount(){
        this.fnGetData();
    }

    fnGetData=async ()=>{
        let oRes = await this.axios.get('/area/city?level=1');        
        console.log(oRes.data.body);

        // 得到所有城市列表数据
        let {oCityList, aCityKey}= fnFormatData( oRes.data.body );
        

        // 加上热门城市数据
        let oRes2 = await this.axios.get('/area/hot');
        oCityList['hot'] = oRes2.data.body;
        aCityKey.unshift('hot');

        // 加上当前城市
        oCityList['#'] = [this.state.oCurrentCity];
        aCityKey.unshift('#');

        console.log(oCityList,aCityKey);

        this.setState({
            oCityList,aCityKey
        })

    }


    render() {
        let { oCityList,aCityKey } = this.state;
        return (
            <div className={ this.props.sClass }>
                <div className="city_title">
                    <span className="shutoff iconfont icon-shut" onClick={()=>{ this.props.fnShowCity('city_wrap') }}></span>
                    <h3>选择城市</h3>
                </div>
        
                <div className="group_con">
                    {
                        aCityKey.map(item=>(
                            <div className="city_group" key={ item }>
                                <h4>{ fnFormatName(item) }</h4>
                                <ul>
                                    {
                                       oCityList[item].map(val=><li key={ val.value }>{val.label}</li>) 
                                    }                                    
                                </ul>
                            </div>
                        ))
                    }             
                </div>
                <ul className="city_index">
                    <li><span>#</span></li>
                    <li><span>热</span></li>
                    <li className="active"><span>A</span></li>
                    <li><span>B</span></li>
                    <li><span>C</span></li>
                    <li><span>D</span></li>
                    <li><span>F</span></li>
                    <li><span>G</span></li>
                    <li><span>H</span></li>
                    <li><span>J</span></li>
                    <li><span>K</span></li>
                    <li><span>L</span></li>
                    <li><span>M</span></li>
                    <li><span>N</span></li>
                    <li><span>Q</span></li>
                    <li><span>S</span></li>
                    <li><span>T</span></li>
                    <li><span>W</span></li>
                    <li><span>X</span></li>
                    <li><span>Y</span></li>
                    <li><span>Z</span></li>
                </ul>
            </div>
        );
    }
}

export default City;
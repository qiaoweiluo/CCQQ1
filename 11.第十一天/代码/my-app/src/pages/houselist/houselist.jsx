import React, { Component } from 'react';
import './houselist.css';
import { withRouter } from 'react-router-dom';
import City from '../city/city';
import store from '../store';

import { PickerView } from 'antd-mobile';

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
            iCols:1
        }
    }

    componentDidMount(){
        this.fnGetFilterData()
    }

    fnGetFilterData=async ()=>{
        let oRes = await this.axios.get('/houses/condition?id='+ this.state.oCurrentCity.value );
        this.setState({
            oAllFilterData:oRes.data.body
        })
        console.log(oRes.data.body);
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

    render(){
        let {
            aFilterData,    // 循环生成过滤条的数据
            bShowPickView,  // 控制pickview弹框的显示
            bShowTags,      // 控制tags弹框的显示
            sCurrentType,    // 存储当前的类型
            aCurrentFilterData, // 存储当前pickview组件的数据
            iCols  // 存储当前pickview的列数
        } = this.state;

        return (
            <>
                <ul className="filter_list">
                    {
                        aFilterData.map(item=>(
                            <li className={(sCurrentType===item.type)?"current":""} key={ item.type } onClick={()=>this.fnShowPops( item.type ) }>
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
                        />
                    </div>
                    <div className="slide_btns">
                        <span onClick={ this.fnHidePops }>取消</span>
                        <b>确定</b>
                    </div>
                </div>
                <div className={bShowPickView?"mask mask_in":"mask mask_out"}  onClick={ this.fnHidePops }></div>

                {/*  tags弹框结构  */}
                <div className={bShowTags?"tags_pannel tags_pannel_in":"tags_pannel tags_pannel_out"}>
                    <div className="tags_list">
                        <h3>户型</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li className="active">一室</li>
                                <li>二室</li>
                                <li>三室</li>
                                <li>四室</li>
                                <li>四室+</li>
                            </ul>
                        </div>
                        <h3>朝向</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>东</li>
                                <li>西</li>
                                <li>南</li>
                                <li>北</li>
                                <li>东南</li>
                                <li>东北</li>
                                <li>西南</li>
                                <li>西北</li>
                            </ul>
                        </div>
                        <h3>楼层</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>高楼层</li>
                                <li>中楼层</li>
                                <li>低楼层</li>
                            </ul>
                        </div>
                        <h3>房屋亮点</h3>
                        <div className="ul_wrap">
                            <ul>
                                <li>集中供暖</li>
                                <li>双卫生间</li>
                                <li>近地铁</li>
                                <li>近菜场</li>
                                <li>近公园</li>
                            </ul>
                        </div>
                    </div>
                    <div className="tags_btns">
                        <span onClick={ this.fnHidePops }>取消</span>
                        <b>确定</b>
                    </div>
                </div>    
                <div  className={bShowTags?"mask2 mask_in":"mask2 mask_out"} onClick={ this.fnHidePops }></div> 
        
            </>
        )
    }
}







let WithsearchBar = withRouter( SearchBar );
class Houselist extends Component {
    render() {
        return (
            <div>
                <WithsearchBar />
                <FilterBar />
            </div>
        );
    }
}

export default Houselist;
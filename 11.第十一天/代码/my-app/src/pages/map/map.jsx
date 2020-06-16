import React, { Component } from 'react';
import './map.css';
import store from '../store'

// 导入Toast提示框
import { Toast } from 'antd-mobile';

import {BASE_URL } from '../../utils'

let BMap = window.BMap;

class Map extends Component {
    constructor(props){
        super(props);
        this.state = {
            oCurrentCity:store.getState(),
            sClass:'houseList',
            aHouseList:[]
        }
    }

    componentDidMount(){        
        this.map = new BMap.Map("baidu_map");

        // 给地图绑定movestart事件，地图移动时触发此事件
        this.map.addEventListener('movestart',()=>{
            this.setState({
                sClass:'houseList'
            })
        })


        let sCurrentCityName = this.state.oCurrentCity.label;

        // 在组件上存储一个地图缩放级别的变量
        this.level = 11;
        // 通过当前城市名称，获取城市名称的坐标点，再用这个坐标点显示地图
        let myGeo = new BMap.Geocoder();      
        // 将地址解析结果显示在地图上，并调整地图视野    
        myGeo.getPoint(sCurrentCityName, point=>{      
            if (point) {                
                //在地图上加上比例尺
                this.map.addControl(new BMap.NavigationControl()); 
                // 在地图上加上缩放按钮   
                this.map.addControl(new BMap.ScaleControl());
                // 调用在地图上放覆盖物的方法
                this.fnAddOverlayer( point,this.state.oCurrentCity.value,this.level );
            }      
        }, 
        sCurrentCityName);
    }
    // 定义在地图上放覆盖物(数据)的方法
    fnAddOverlayer=async (point,value,level)=>{
        // 如果传递的level参数，那么这个方法是第一调用的
        // 这个时候this.level的值就是11，
        // 如果没有传递这个参数，那么这个方法就是第二次或者第三次调用的
        // 如果是第二次调用，在调用之前，this.level的值是11，把它设置成13，来调用这个方法
        // 如果是第三次调用，在调用之前，this.level的值是13，把它设置成15，来调用这个方法
        if(level){
            this.level = 11;
        }else{
            if(this.level===11){
                this.level = 13
            }else if( this.level===13 ){
                this.level=15
            }
        }
        this.map.centerAndZoom(point,this.level);

        // 开启loading
        Toast.loading('加载中...',0);
        let oRes = await this.axios.get('/area/map?id='+ value);

        // 关闭loading
        Toast.hide();
        //console.log(oRes.data.body);
        let aCityList = oRes.data.body;

        if( this.level!==15 ){
            aCityList.map(item=>{
                let oPos = new BMap.Point(item.coord.longitude,item.coord.latitude);
                let opts = {
                    position : oPos,    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size(-37, -37)    //设置文本偏移量
                }
    
                let label = new BMap.Label(`<div class='map_label01'>${item.label}<br />${item.count}套</div>`, opts);  // 创建文本标注对象
                
                label.setStyle({
                    border : "0px",
                    background : "transparent"         
                });
    
                // 给label标签绑定点击事件
                label.addEventListener('click',()=>{
                    this.fnRefreshMap( oPos,item.value )
                })   
                this.map.addOverlay(label); 
            }) 
        }else{
            aCityList.map(item=>{
                let oPos = new BMap.Point(item.coord.longitude,item.coord.latitude);
                let opts = {
                    position : oPos,    // 指定文本标注所在的地理位置
                    offset   : new BMap.Size(-60, -56)    //设置文本偏移量
                }
    
                let label = new BMap.Label(`<div class='map_label02'>${item.label}&nbsp;&nbsp;&nbsp;${item.count}套</div>`, opts);  // 创建文本标注对象
                
                label.setStyle({
                    border : "0px",
                    background : "transparent"         
                });
    
                // 给label标签绑定点击事件
                label.addEventListener('click',(e)=>{
                    //console.log(e.changedTouches[0]);
                    let iMovex = 0;
                    let iMovey = 0;

                    // 计算地图移动的位置
                    // 增加程序健壮性优化( changedTouches对象可能在某种情况下拿不到 )
                    try{
                        iMovex = window.innerWidth/2 - e.changedTouches[0].clientX;
                        iMovey = window.innerHeight/4 - e.changedTouches[0].clientY;
                    }catch(err){
                        iMovex = window.innerWidth/2 - e.clientX;
                        iMovey = window.innerHeight/4 - e.clientY;
                    }                    

                    this.fnShowHouseList(item.value,{iMovex,iMovey});
                })   
                this.map.addOverlay(label); 
            })
        }            

    }

    fnShowHouseList=async (value,obj)=>{

        // 让地图移动
        this.map.panBy( obj.iMovex,obj.iMovey );

        //console.log(value);
         // 开启loading
        Toast.loading('加载中...',0);
        let oRes = await this.axios.get('/houses?cityId='+ value);
        //console.log(oRes.data.body.list);
 
         // 关闭loading
        Toast.hide();

        this.setState({
            sClass:'houseList houseListShow',
            aHouseList:oRes.data.body.list
        })
    }


    fnRefreshMap=(point,value)=>{
        // 清除地图上原有的覆盖物
        // 加定时器包裹清除覆盖物的方法，是为了解决它里面报错的问题
        setTimeout(()=>{
            this.map.clearOverlays();
        },0);       

        // 在地图上添加新的覆盖物
        this.fnAddOverlayer( point,value )
    }


    render() {
        let { sClass, aHouseList} = this.state;

        return (
            // 最外层的容器标签可以用空标签
            <>
                <div className="common_title">
                    <span className="back iconfont icon-prev" onClick={ ()=>this.props.history.goBack() }></span>
                    <h3>地图找房</h3>
                </div>
                <div className="map_com" >
                    <div id="baidu_map" style={ {'width':'100%','height':'100%'} }></div>
                </div>

                <div className={ sClass }>
                    <div className="titleWrap">
                        <h1 className="listTitle">房屋列表</h1>
                        <a className="titleMore" href="/house/list">
                            更多房源
                        </a>
                    </div>

                    <div className="houseItems">
                        {
                            aHouseList.map(item=>(
                                <div className="house" key={ item.houseCode }>
                                    <div className="imgWrap">
                                        <img className="img" src={ BASE_URL+item.houseImg} />
                                    </div>
                                    <div className="content">
                                        <h3 className="title">{item.title}</h3>
                                        <div className="desc">{item.desc}</div>
                                        <div>
                                            {
                                                item.tags.map((val,i)=>(
                                                    <span className={"tag tag"+i} key={i}>{ val }</span>
                                                ))
                                            }                                            
                                        </div>
                                        <div className="price">
                                            <span className="priceNum">{item.price}</span> 元/月
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default Map;
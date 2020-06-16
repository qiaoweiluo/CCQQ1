import React, { Component } from 'react';
import './detail.css';
import { Carousel } from 'antd-mobile';
import { BASE_URL } from '../../utils';
import avatar from '../../assets/images/avatar.png'

const oSupport = {
    '衣柜':{sClass:'iconfont icon-yigui'},
    '洗衣机':{sClass:'iconfont icon-xiyiji'},
    '空调':{sClass:'iconfont icon-kongtiao'},
    '天然气':{sClass:'iconfont icon-tianranqi'},
    '冰箱':{sClass:'iconfont icon-bingxiang'},
    '电视':{sClass:'iconfont icon-dianshi'},
    '热水器':{sClass:'iconfont icon-reshuiqi'},
    '沙发':{sClass:'iconfont icon-shafa'},
    '暖气':{sClass:'iconfont icon-nuanqi'},
    '宽带':{sClass:'iconfont icon-_huabanfuben'},
}

class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            oHouseData:{
                houseImg:[],
                tags:[],
                oriented:[],
                supporting:[]
            }
        }
    }

    componentDidMount(){
        this.fnGetHouseData();
    }

    fnGetHouseData=async ()=>{
        let houseCode = this.props.match.params.houseCode;
        let oRes = await this.axios.get('/houses/'+houseCode);
        console.log(oRes);
        this.setState({
            oHouseData:oRes.data.body
        },()=>{

            let BMap = window.BMap;
            let map = new BMap.Map("baidu_map");
            let { longitude,latitude } = this.state.oHouseData.coord;
            var point = new BMap.Point(longitude, latitude);

            // 在地图上加红色定位标记
            let marker = new BMap.Marker(point);  // 创建标注
	        map.addOverlay(marker);
            map.centerAndZoom(point, 15);
        })
    }

    render() {
        let {
            houseImg,
            title,
            tags,
            price,
            roomType,
            size,
            floor,
            oriented,
            community,
            supporting,
            description
        } = this.state.oHouseData;

        return (
            <div>
                <span className="detail_back iconfont icon-prev" onClick={ ()=>this.props.history.goBack() }></span>    
                <div className="detail_slide_con">
                    {
                        houseImg.length > 0 && <Carousel
                        autoplay={true}
                        infinite
                        >
                        {houseImg.map((val,i) => (
                            <a
                            key={ i }
                            href="http://www.itcast.cn"
                            style={{ display: 'inline-block', width: '100%', height: '10.375rem' }}
                            >
                            <img
                                src={BASE_URL + val}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />
                            </a>
                        ))}
                    </Carousel>
                    }
                </div>

                <div className="detail_info">
                    <div className="detail_more">
                        <h3>{title}</h3>
                        <div className="detail_tag">
                            {
                                tags.map((item,i)=><span className={"tag tag"+i} key={i}>{item}</span>)
                            }                          
                          
                        </div>
                    </div>

                    <ul className="detail_more more2">
                        <li>
                            <span>{price}<em>/月</em></span>
                            <b>租金</b>
                        </li>
                        <li>
                            <span>{roomType}</span>
                            <b>房型</b>
                        </li>
                        <li>
                            <span>{size}平米</span>
                            <b>面积</b>
                        </li>
                    </ul>
                    <ul className="detail_more more3">
                        <li><em>装修：</em>精装</li>
                        <li><em>楼层：</em>{floor}</li>
                        <li><em>朝向：</em>{oriented.join(',')}</li>
                        <li><em>类型：</em>普通住宅</li>
                    </ul>
                </div>

                <div className="detail_info">
                    <h4 className="map_title">{community}</h4>
                    <div className="map_con">
                        <div id="baidu_map" style={{'width':'100%','height':'100%'}}></div>
                    </div>

                    <h3 className="detail_common_title">
                        房屋配套
                    </h3>
                    <ul className="support_list">
                        {
                            supporting.map((item,i)=>(
                                <li key={i}>
                                    <i className={ oSupport[item].sClass }></i>
                                    <b>{item}</b>
                                </li>
                            ))
                        }
                        {
                           supporting.length===0 && <div style={{'marginBottom':'10px'}}>暂无房屋配套信息</div> 
                        }                     
                    </ul>
                </div>

                <div className="detail_info">
                    <h3 className="detail_common_title">
                        房屋概况
                    </h3>
                    <div className="landlord ">            
                        <div className="lorder">
                            <img src={ avatar } alt="" />
                            <div className="lorder_name">
                                <b>王女士</b>
                                <span><i className="iconfont icon-renzheng"></i> <b>已认证房主</b></span>
                            </div>
                            
                        </div>
                        <span className="send_info">发消息</span>
                    </div>
                    <p className="detail_text">
                        { description || '暂无房屋介绍' }
                    </p>
                </div>

                <ul className="down_btns">
                    <li className="collect"><i className="iconfont icon-shoucang"></i> 收藏</li>  
                    <li>在线咨询</li>  
                    <li className="active"><a href="tel:400-618-4000">电话预约</a></li>  
                </ul>
            </div>
        );
    }
}

export default Detail;
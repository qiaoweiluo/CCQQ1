import React, { Component } from "react";
import "./rent.css";
import store from '../store';


import {
    List,
    InputItem,
    Picker,
    ImagePicker,
    TextareaItem,
    Toast
} from "antd-mobile";

// 房屋类型
const roomTypeData = [
  { label: "一室", value: "ROOM|d4a692e4-a177-37fd" },
  { label: "二室", value: "ROOM|d1a00384-5801-d5cd" },
  { label: "三室", value: "ROOM|20903ae0-c7bc-f2e2" },
  { label: "四室", value: "ROOM|ce2a5daa-811d-2f49" },
  { label: "四室+", value: "ROOM|2731c38c-5b19-ff7f" }
];

// 朝向：
const orientedData = [
  { label: "东", value: "ORIEN|141b98bf-1ad0-11e3" },
  { label: "西", value: "ORIEN|103fb3aa-e8b4-de0e" },
  { label: "南", value: "ORIEN|61e99445-e95e-7f37" },
  { label: "北", value: "ORIEN|caa6f80b-b764-c2df" },
  { label: "东南", value: "ORIEN|dfb1b36b-e0d1-0977" },
  { label: "东北", value: "ORIEN|67ac2205-7e0f-c057" },
  { label: "西南", value: "ORIEN|2354e89e-3918-9cef" },
  { label: "西北", value: "ORIEN|80795f1a-e32f-feb9" }
];

// 楼层
const floorData = [
  { label: "高楼层", value: "FLOOR|1" },
  { label: "中楼层", value: "FLOOR|2" },
  { label: "低楼层", value: "FLOOR|3" }
];

// 房屋配置
const oSupport = [
  {key:'衣柜',sClass:'iconfont icon-yigui'},
  {key:'洗衣机',sClass:'iconfont icon-xiyiji'},
  {key:'空调',sClass:'iconfont icon-kongtiao'},
  {key:'天然气',sClass:'iconfont icon-tianranqi'},
  {key:'冰箱',sClass:'iconfont icon-bingxiang'},
  {key:'电视',sClass:'iconfont icon-dianshi'},
  {key:'热水器',sClass:'iconfont icon-reshuiqi'},
  {key:'沙发',sClass:'iconfont icon-shafa'},
  {key:'暖气',sClass:'iconfont icon-nuanqi'},
  {key:'宽带',sClass:'iconfont icon-_huabanfuben'},
]

/* 
  {
      "title": "整租 · 豪华小区 精装修出租 小区环境幽静",
      "description": "【装修描述】 装修简洁，家电配齐，通风采光效果良好，格局方正。",
      "houseImg": "img1|im2|img3",
      "oriented": "ORIEN|caa6f80b-b764-c2df",
      "supporting": "空调|洗衣机",
      "price": "1234",
      "roomType": "ROOM|ce2a5daa-811d-2f49",
      "size": "123",
      "floor": "FLOOR|1",
      "community": "AREA|93cbbe43-741d-de54"
  }
*/

class Rent extends Component {
  state={
    // 临时图片地址
    tempSlides: [],
    // 小区搜索结果
    communitylist:[],
    // 小区的名称和id
    community:{},
    // 价格
    price: '',
    // 面积
    size: '',
    // 房屋类型
    roomType: '',
    // 楼层
    floor: '',
    // 朝向：
    oriented: '',
    // 房屋标题
    title: '',
    // 房屋图片
    houseImg: '',
    // 房屋配套：
    supporting:[],
    // 房屋描述
    description: '',
    // 搜索关键词
    sKey:'',
    // 
    sClass:'search_key_pannel',
    // 当前城市
    sCurrntCity:store.getState().value

  }

  getValue = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  handleImage = (files) => {
    this.setState({
      tempSlides: files
    })
  }

  fnSetSupport=(key)=>{
    this.setState(state=>{
        let aNowSupporting = JSON.parse( JSON.stringify(state.supporting) )
        if(aNowSupporting.includes(key)){
            let aNewArr = aNowSupporting.filter(item=>item!==key);
            return {
                supporting:aNewArr
            }
        }else{
            aNowSupporting.push(key);
            return {
                supporting:aNowSupporting
            }
        }
    })
  }

  fnShowSearchPannel=()=>{
      this.setState(state=>{
          if( state.sClass==='search_key_pannel' ){
              return {
                sClass:'search_key_pannel search_slide_up'
              }
          }else{
            return {
                sClass:'search_key_pannel'
              }
          }
      })
  }

  fnGetcommunity= async (key)=>{
      let oRes = await this.axios.get('/area/community',{
          params:{
              name:key,
              id:this.state.sCurrntCity
          }
      });
      //console.log(oRes);
      this.setState({
        communitylist:oRes.data.body
      })
  }

  fnSetCommunity=(item)=>{
      this.setState({
           community:item
      },()=>{
          this.fnShowSearchPannel()
      })
  }

  fnAddHouse= async ()=>{
    let {
        tempSlides,
        houseImg,
        title,
        description,
        oriented,
        supporting,
        price,
        roomType,
        size,
        floor,
        community
        } = this.state

        if (tempSlides.length <= 0){
            Toast.info('请上传房屋图片在发布！',2);
            return;
        }

        let oFd = new FormData()

        tempSlides.map(item=>{
            oFd.append('file',item.file)
        })

        // 上传图片
        let oRes = await this.axios.post('/houses/image',oFd, {
            headers: {
            'content-type': 'multipart/form-data'
            }
        })

        houseImg = oRes.data.body.join('|');
        let sNowsupporting = this.state.supporting.join('|');
        let sNowcommunity = this.state.community.community;

       // 发布房源：
        const houseRes = await this.axios.post('/user/houses', {
            houseImg,
            title,
            description,
            oriented,
            supporting:sNowsupporting,
            price,
            roomType,
            size,
            floor,
            community:sNowcommunity
        })

        const { status } = houseRes.data;
        if(status===200){
            Toast.info('发布房源成功！',2,()=>{
                this.props.history.push('/zlist');
            })
        }
  }

  render() {
    let {
        community,
        communitylist,
        price,
        roomType,
        floor,
        oriented,
        description,
        tempSlides,
        title,
        size,
        supporting,
        sKey,
        sClass
      } = this.state

    return (
        <>
        <div className="rent_wrap">
          <div className="rent_title">
              <span className="back iconfont icon-prev" onClick={()=>this.props.history.goBack() }></span>
              <h3>发布房源</h3>
          </div>
          <h3 className="rent_sub_title">房源信息</h3>
          <div className="options">
              <div className="select_bar" onClick={ this.fnShowSearchPannel }><span className="fl">小区名称</span><i className="iconfont icon-next fr"></i><b className="fr">{community.communityName}</b></div>
                <InputItem 
                    placeholder="请输入租金/月" 
                    extra="¥/月"
                    value={price}
                    onChange={val => this.getValue('price', val)}
                >
                租金
                </InputItem>
                <InputItem 
                    placeholder="请输入建筑面积" 
                    extra="㎡"
                    value={size}
                    onChange={val => this.getValue('size', val)}
                >
                建筑面积
                </InputItem>

              <Picker 
                 data={roomTypeData}
                 value={[roomType]}
                 cols={1}
                 onChange={val => this.getValue('roomType', val[0])}
              >
                <List.Item arrow="horizontal">户型</List.Item>
              </Picker>

              <Picker 
                  data={floorData}
                  value={[floor]}
                  cols={1}
                  onChange={val => this.getValue('floor', val[0])}
              >
                <List.Item arrow="horizontal">所在楼层</List.Item>
              </Picker>

              <Picker 
                 data={orientedData}
                 value={[oriented]}
                 cols={1}
                 onChange={val => this.getValue('oriented', val[0])}
              >
                <List.Item arrow="horizontal">朝向</List.Item>
              </Picker>
          </div>
          <h3 className="rent_sub_title2">房屋标题</h3>
          <InputItem
            placeholder="请输入房屋标题"
            value={title}
            onChange={val => this.getValue('title', val)}
          />
          <h3 className="rent_sub_title2">房屋图像</h3>
          <ImagePicker
            files={tempSlides}
            multiple={true}
            onChange={this.handleImage}
          />
          <h3 className="rent_sub_title2">房屋配置</h3>

          <ul className="detail_support_list">
              {
                oSupport.map((item,i)=>(
                    <li 
                        key={i} 
                        className={ supporting.includes( item.key )?'active':'' }
                        onClick={()=>this.fnSetSupport( item.key ) }
                    >
                        <i className={ item.sClass }></i>
                        <b>{ item.key }</b>
                    </li>
                ))
              }
          </ul>

          <h3 className="rent_sub_title2">房屋描述</h3>

          <TextareaItem
            rows={5}
            placeholder="请输入房屋描述信息"
            autoHeight
            value={description}
            onChange={val => this.getValue('description', val)}
          />

          <div className="down_btns">
              <span>取消</span>
              <b onClick={ this.fnAddHouse }>确定</b>
          </div>
        </div>
        
        <div className={sClass}>
            <div className="search_key_header">
                <div className="search_input">
                    <InputItem placeholder="请输入关键词" value={sKey} onChange={val => this.getValue('sKey', val)}/>
                </div>
                {
                    sKey!==''?(<div className="search_btn" onClick={()=>this.fnGetcommunity( sKey )}>搜索</div>):(<div className="search_btn" onClick={ this.fnShowSearchPannel }>取消</div>)
                }                 
                <ul className="search_res_list">
                    {
                        communitylist.map(item=>(
                            <li key={ item.community } onClick={()=>this.fnSetCommunity(item) }>{item.communityName}</li>
                        ))
                    }
                    
                </ul>
            </div>
        </div>
        </>
    )
  }
}


export default Rent;

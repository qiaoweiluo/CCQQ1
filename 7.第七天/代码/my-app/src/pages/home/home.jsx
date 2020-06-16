import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import { Carousel } from 'antd-mobile';
import { BASE_URL } from '../../utils'

// 定义轮播图组件
class Slide extends Component{
    /*  
    constructor(props){
        super(props);
        this.state = {
            data:[1,2,3]
        }
    } 
    */

    // 上面的state属性的初始化可以简写成下面的形式
    state = {
        data:[]
    }

    componentDidMount(){
       this.fnGetData()
    }

    fnGetData =async ()=>{
        let oRes = await this.axios.get('/home/swiper');
        //console.log(oRes.data.body);
        this.setState({
            data:oRes.data.body
        })
    }

    render(){
        return (
            <div className="slide_con">
                {
                    this.state.data.length > 0 && <Carousel
                    autoplay={true}
                    infinite
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val.id}
                        href="http://www.itcast.cn"
                        style={{ display: 'inline-block', width: '100%', height: '10.6rem' }}
                        >
                        <img
                            src={BASE_URL + val.imgSrc}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                        />
                        </a>
                    ))}
                </Carousel>
                }
                
            </div>
        )
    }
}


let Menu = props=>(
    <ul className="menu_con">
        <li>
            <Link to="#/"><i className="iconfont icon-zufang1"></i></Link>
            <h4>整租</h4>
        </li>
        <li>
            <Link to="#/"><i className="iconfont icon-usergroup"></i></Link>
            <h4>合租</h4>
        </li>
        <li>
            <Link to="#/"><i className="iconfont icon-ic-maplocation-o"></i></Link>
            <h4>地图找房</h4>
        </li>
        <li>
            <Link to="#/"><i className="iconfont icon-zufang"></i></Link>
            <h4>去出租</h4>
        </li>
    </ul>
);


class Group extends Component{
    state = {
        aList:[]
    }

    componentDidMount(){
        this.fnGetData()
     }
 
     fnGetData =async ()=>{
         let oRes = await this.axios.get('/home/groups?area=AREA%7C88cff55c-aaa4-e2e0');
         //console.log(oRes.data.body);
         this.setState({
             aList:oRes.data.body
         })
     }

    render(){
        let { aList } = this.state;
        return (
            <div className="model2">
                <div className="title_con">
                    <h3>租房小组</h3>
                    <Link to="/" className="iconfont icon-next"></Link>
                </div>
                <ul className="house_list">
                    {
                        aList.map(item=>(
                             <li key={item.id}>
                                <p className="fl">{item.title}</p>
                                <img src={BASE_URL + item.imgSrc} alt="" className="fr" />
                                <span className="fl">{item.desc}</span>
                            </li>
                        ))
                    }
                                      
                </ul>
            </div>
        )
    }
}


class Home extends Component {
    render() {
        return (
            <div>
                <Slide />
                <Menu />
                <Group />
            </div>
        );
    }
}

export default Home;
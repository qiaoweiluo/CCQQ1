import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

import { Carousel } from 'antd-mobile';
import { BASE_URL } from '../../utils';

import store from '../store';
import City from '../city/city';

// 从react-router-dom中导入高级组件withRouter来让没有参与路由的组件获得路由信息
import { withRouter } from 'react-router-dom';


// 定义searchbar组件
class Searchbar extends Component{
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

    componentDidMount(){ 
        // 验证sessionStorage里面是否存储了当前城市
        // 如果有当前城市，就直接用sessionStorage里面的当前城市，不用去定位和请求
        // 如果没有，就去定位和请求
        let sCurrentCity= sessionStorage.getItem('haoke_current_city');

        if( sCurrentCity ){
            // 如果是有存储当前城市
            let oCurrentCity = JSON.parse( sCurrentCity );
           /*  
           this.setState({
                sCurrentCityName:oCurrentCity.label
            })             
            */

            // 将当前城市存储到数据中心
            store.dispatch({
                type:'change_city',
                value:oCurrentCity
            })

        }else{
            // 如果没有存储当前城市

            // 页面上引入了百度地图的js，它里面的变量和函数，在其他组件中是拿不到的，这个是react的问题
            // 这些变量或者函数是全局的变量和函数，它默认会放到window对象上
            // 我们可以通过window对象去拿这些变量和函数
            let BMap = window.BMap;
            var myCity = new BMap.LocalCity();
            
            /* 
            function myFun(result){
                var cityName = result.name;
                console.log("当前定位城市:"+cityName);
            }      
            myCity.get(myFun); 
            */            
            myCity.get(async result=>{
                let cityName = result.name;
                //console.log("当前定位城市:"+cityName);

                // 将当前城市名称去请求一个接口，验证当前城市是否在公司业务范围内
                // 如果在公司业务范围内，就返回这个城市的信息，如果不在公司业务范围内，就返回上海的城市信息
                let oRes =await this.axios.get('/area/info?name='+cityName);

                //console.log(oRes.data.body);
                /* this.setState({
                    sCurrentCityName:oRes.data.body.label
                }) */

                 // 将当前城市存储到数据中心
                store.dispatch({
                    type:'change_city',
                    value:oRes.data.body
                })
                // 将返回的当前城市存储到sessionStorage中
                sessionStorage.setItem('haoke_current_city', JSON.stringify( oRes.data.body ) )

            });
        }
    }

    fnShowCity=(sClass)=>{
        this.setState({
            sClass
        })
    }

    render(){
        return (
            <div className="search_bar">
                <div className="search_con">
                    <span className="city" onClick={()=>{ this.fnShowCity('city_wrap slideUp') }  }>{this.state.sCurrentCityName}</span>
                    <i className="iconfont icon-xialajiantouxiangxia"></i>
                    <span className="village"><i className="iconfont icon-fangdajing"></i> 请输入小区名</span>
                </div>
                <i className="iconfont icon-ic-maplocation-o tomap" onClick={ ()=>this.props.history.push('/map') }></i>
                <City sClass={this.state.sClass} fnShowCity={ this.fnShowCity } />
            </div>
        )
    }
}


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
            <Link to="/map"><i className="iconfont icon-ic-maplocation-o"></i></Link>
            <h4>地图找房</h4>
        </li>
        <li>
            <Link to="/rent"><i className="iconfont icon-zufang"></i></Link>
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

// 用高级组件包裹Searchbar，让Searchbar拥有路由信息
let WithSearchbar = withRouter( Searchbar );

class Home extends Component {
    render() {
        return (
            <div>
                <WithSearchbar />
                <Slide />
                <Menu />
                <Group />
            </div>
        );
    }
}

export default Home;
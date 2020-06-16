import React, { Component } from 'react';
import { BASE_URL } from '../../utils';
import './rentlist.css';

class Rentlist extends Component {
    state={
        aHouseList:[]
    }

    componentDidMount(){
        this.fnGetRentHouse();
    }

    fnGetRentHouse = async ()=>{
        let oRes = await this.axios.get('/user/houses');
        this.setState({
            aHouseList:oRes.data.body
        })
    }

    render() {
        let { aHouseList } = this.state;
        return (
            <div>
                <div className="rent_title">
                    <span className="back iconfont icon-prev" onClick={()=>this.props.history.goBack() }></span>
                    <h3>已发布房源</h3>
                </div>

                <div className="rent_house_list_con">
                    {
                        aHouseList.map(item=>(
                            <div className="house_wrap" key={ item.houseCode }>
                                <div className="house_item" onClick={()=>this.props.history.push('/detail/'+item.houseCode) }>
                                    <div className="imgWrap">
                                        <img className="img" src={BASE_URL+item.houseImg} />
                                    </div>
                                    <div className="content">
                                        <h3 className="title">{item.title}</h3>
                                        <div className="desc">{item.desc}</div>
                                        <div>
                                            {
                                                item.tags.map((val,i)=>(
                                                    <span key={i} className={"tag tag"+i}>{val}</span>
                                                ))
                                            }                                         
                                        </div>
                                        <div className="price">
                                            <span className="priceNum">{item.price}</span> 元/月
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        );
    }
}

export default Rentlist;
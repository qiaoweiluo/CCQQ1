import React, { Component } from 'react';
import { Breadcrumb,Table,InputNumber,Button } from 'element-react';
import store from './store';

class Cart extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns:[
                {
                    label: "名称",
                    prop: "goods_name",
                    width:150
                },
                {
                    label: "图片",
                    prop: "url",
                    render: data=>(
                        <img src={ data.url } style={{'width':'100%','margin':'10px 0'}} alt=""/>
                    )
                },
                {
                    label: "数量",
                    prop: "num",
                    width:150,
                    render: data=>(
                        <InputNumber 
                            size="small" 
                            defaultValue={data.num} 
                            value={ data.num } 
                            min={1}
                            onChange={(val)=>this.fnChangNum(val,data.id) }
                        >
                        </InputNumber>
                    )
                },
                {
                    label: "单价",
                    prop: "price"
                },
                {
                    label: "总价",
                    prop: "price",
                    render: data=>(
                        <span>{ data.num * data.price }</span>
                    )
                },
                {
                    label: "操作",
                    render: data=>(
                        <Button type="danger" size="small" onClick={()=>this.fnDel( data.id ) }>删除</Button>
                    )
                }
            ],
            data:store.getState(),
            iTotalPrice:this.fnCountTotalPrice()
        }

        this.unsubscribe = store.subscribe( this.fnStoreChange )
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    fnStoreChange=()=>{
        this.setState({
            data:store.getState(),
            iTotalPrice:this.fnCountTotalPrice()
        })
    }
    fnChangNum=(val,id)=>{
        //console.log(val);
        store.dispatch({
            type:'change_goods_num',
            value:val,
            id
        })
    }

    fnDel=(id)=>{
        store.dispatch({
            type:'del_goods',
            id
        })
    }

    // 定义方法计算整体价格
    fnCountTotalPrice=()=>{
        let aGoodsList = store.getState();
        let iTotalPrice = 0;

        aGoodsList.map(item=>{
            iTotalPrice += item.num * item.price
        })

        return iTotalPrice;
    }


    render() {
        return (
            <div>
                 <Breadcrumb separator="/" className="mp10">
                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                    <Breadcrumb.Item>购物车</Breadcrumb.Item>                
                </Breadcrumb>

                <Table
                    className="mp10"
                    style={{width: '100%'}}
                    columns={this.state.columns}
                    data={this.state.data}
                    border={true}
                    highlightCurrentRow={true}
                />
                <div className="total_price">
                总价：￥<em>{this.state.iTotalPrice}</em>
                </div>

            </div>
        );
    }
}

export default Cart;
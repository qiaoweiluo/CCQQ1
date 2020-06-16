import React, { Component } from 'react';
import './user.css';

import avatar02 from '../../assets/images/avatar02.png';
import join from '../../assets/images/join.png';

import { BASE_URL } from '../../utils';

// 导入对话弹框
import { Modal } from 'antd-mobile';

class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            avatar:'',
            nickname:'',
            bIsLogin:false
        }
    }

    componentDidMount(){
        this.fnGetUserInfo();
    }

    fnGetUserInfo=async ()=>{
        let token = localStorage.getItem('haoke_token');
        if( token ){            
            let oRes = await this.axios.get('/user');        
            let { status, body } = oRes.data;
            
            if( status===200 ){
                this.setState({
                    avatar:body.avatar,
                    nickname:body.nickname,
                    bIsLogin:true
                })
            }
        }
    }


    fnLogOut=()=>{
        Modal.alert('用户退出', '你确认退出吗?', [
            { text: '取消' },
            { text: '确定', onPress: async () => {                
                let oRes = await this.axios.post('/user/logout')
                
                let { status } = oRes.data;

                if( status===200 ){
                    this.setState({
                        avatar:'',
                        nickname:'',
                        bIsLogin:false
                    })

                    localStorage.removeItem('haoke_token');
                }
            }}
        ])       
    }

    render() {
        let{ bIsLogin,avatar,nickname } = this.state;
        return (
            <div className="user_wrap">
                <div className="user_header">
                    {
                        bIsLogin?(
                            <div className="info_pannel">
                                <img src={ BASE_URL+ avatar} alt="" />
                                <div className="role">{nickname}</div>
                                <span className="gologin" onClick={this.fnLogOut }>退出</span>
                            </div>
                        ):(
                            <div className="info_pannel">
                                <img src={avatar02} alt="" />
                                <div className="role">游客</div>
                                <span className="gologin" onClick={ ()=>this.props.history.push('/login') }>去登录</span>
                            </div>
                        )
                    }

                </div>
                <ul className="opt_list">
                    <li>
                        <i className="iconfont icon-shoucang"></i>
                        <span>我的收藏</span>
                    </li>
                    <li>
                        <i className="iconfont icon-home"></i>
                        <span>我的出租</span>
                    </li>
                    <li>
                        <i className="iconfont icon-shijian"></i>
                        <span>看房记录</span>
                    </li>
                    <li>
                        <i className="iconfont icon-fangdong"></i>
                        <span>成为房主</span>
                    </li>
                    <li>
                        <i className="iconfont icon-wode"></i>
                        <span>个人资料</span>
                    </li>
                    <li>
                        <i className="iconfont icon-kefu"></i>
                        <span>联系我们</span>
                    </li>
                </ul>
                <div className="join">
                    <img src={join} alt="" />
                </div>
            </div>
        );
    }
}

export default User;
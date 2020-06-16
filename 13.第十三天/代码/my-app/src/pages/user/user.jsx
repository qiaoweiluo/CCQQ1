import React, { Component } from 'react';
import './user.css';

import avatar02 from '../../assets/images/avatar02.png';
import join from '../../assets/images/join.png';

class User extends Component {
    render() {
        return (
            <div className="user_wrap">
                <div className="user_header">
                    <div className="info_pannel">
                        <img src={avatar02} alt="" />
                        <div className="role">游客</div>
                        <span className="gologin" onClick={ ()=>this.props.history.push('/login') }>去登录</span>
                    </div>
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
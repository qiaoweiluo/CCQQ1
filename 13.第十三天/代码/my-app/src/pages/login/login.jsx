import React, { Component } from 'react';
import './login.css';
import logo from '../../assets/images/login_title.png'

class Login extends Component {
    render() {
        return (
            <div className="login_wrap">
                <span className="back iconfont icon-prev" onClick={ ()=>this.props.history.goBack() }></span>
                <div className="login_title">
                    <img src={logo} alt="好客租房网站logo" />
                </div>
                <form className="login_form">
                    <div className="form_group">
                        <input type="text" placeholder="用户名" />
                        <p className="err_tip">用户名和密码有误</p>
                        <input type="password" placeholder="密码" />
                        <p className="err_tip err_pass_tip">用户名和密码有误</p>
                    </div>
                    <input type="button" value="登 录" className="input_sub" />
                </form>
                <div className="register">新用户注册</div>
                <div className="findpass">忘记密码</div>
            </div>
        );
    }
}

export default Login;
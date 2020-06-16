import React, { Component } from 'react';
import logo from '../../assets/images/login_title.png';
import styles from './login.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { Toast } from 'antd-mobile';
import * as yup from 'yup';

// 导入表单处理组件
import { withFormik } from 'formik';
let Login = props => {
        let {
            values,
            handleChange,
            handleSubmit,
            errors,
            handleBlur,
            // touched里面存储了表单是否操作过的布尔值
            touched

        } = props;

        //console.log(touched);

        return (
            <div className={styles.login_wrap}>
                <span className={[styles.back,"iconfont","icon-prev"].join(' ')} onClick={ ()=>props.history.goBack() }></span>
                <div className={styles.login_title}>
                    <img src={logo} alt="好客租房网站logo" />
                </div>
                <form className={styles.login_form}>
                    <div className={styles.form_group}>
                        <input 
                            type="text" 
                            placeholder="用户名" 
                            value = { values.username }
                            onChange = { handleChange }
                            name="username"
                            autoComplete="off"
                            // 绑定blur事件是为了判断表单是否有操作过，如果有操作过，才显示错误提示信息
                            // 如果没有操作过，就不显示提示信息
                            onBlur = { handleBlur }
                        />
                        {
                            (errors.username && touched.username) && <p className={styles.err_tip}>{errors.username}</p>
                        }                      

                        <input 
                            type="password" 
                            placeholder="密码" 
                            value = { values.password }
                            onChange = { handleChange }
                            name="password"
                            onBlur = { handleBlur }
                        />
                        {
                            ( errors.password && touched.password ) &&  <p className={[styles.err_tip,styles.err_pass_tip].join(' ')}>{errors.password}</p>
                        }                       
                    </div>
                    <input type="button" value="登 录" className={styles.input_sub} onClick={ handleSubmit } />
                </form>
                <div className={styles.register}>新用户注册</div>
                <div className={styles.findpass}>忘记密码</div>
            </div>
    );    
}

let reName = /^\w{5,10}$/i;
let rePass = /^\w{5,10}$/i;

let WithLogin = withFormik({
    mapPropsToValues: () => ({username:'',password:''}),

    // 增加表单验证的方法
    validationSchema:yup.object().shape({
        username:yup.string().required('用户名不能为空！').matches(reName,'用户名是5到10位的数字字母和下划线'),
        password:yup.string().required('密码不能为空！').matches(rePass,'密码是5到10位的数字字母和下划线')    
    }),

    // 在下面方法的参数中，可以通过解构的方式拿到props属性
    handleSubmit:async (values,{props})=>{
        //console.log(values);
        let oRes = await axios.post(BASE_URL+'/user/login',values);
        //console.log( oRes.data );
        let { status,description } = oRes.data;
        if( status===200 ){            
            localStorage.setItem('haoke_token',oRes.data.body.token);
            Toast.info('登录成功',2,()=>{
                // 跳转到刚才的页面
                props.history.goBack();
            });
        }else{
            Toast.info(description,2);
        }
    }

})(Login);

export default WithLogin;
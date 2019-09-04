import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react'
import {Link} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {
    state = {
        account : "",
        password : "",
        gotoMain : false
    };
    render() {
        if(this.state.gotoMain)
            return <Redirect to={{pathname : '/', state : {isLogin: true}}} />;
        return (
        <div>
            <div className="sub-content">
                <p>로그인</p>
            </div>
            <div className="container">
                <div className="login-display">
                    <div className="login-content">
                        <div className="login-box">
                            아이디 <input type="text" value={this.state.account} onChange={this.updateAccount}/>
                        </div>
                        <div className="login-box">
                            비밀번호 <input type="password" value={this.state.password} onChange={this.updatePassword}/>
                        </div>
                        <div className="login-button">
                            <button onClick={this.onlogin}>로그인</button>
                            <Link to='/user/register' >회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

    updateAccount = event => {
        this.setState({
            ...this.state,
            account : event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password : event.target.value
        });
    };

    onlogin = () => {;
        if (this.props.stores.UserStore.onLogin(this.state)){
            this.setState({
                ...this.state,
                gotoMain: true
            });
        }
    };
}

export default Login;
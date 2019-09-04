import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import {Link} from 'react-router-dom';
import user_img from '../assets/noimage.jpg';
@inject('stores')
@observer
class LogoutItem extends Component {

    render() {
        let user = this.props.stores.UserStore.item;
        let link = `/user/view/${user.id}`;
        let img = null;
        if (user.profile_url === null){
            img = <img src={user_img} alt=""/>
        } else {
            let src = `http://localhost:8080/download/${user.id}`;
            img = <img src={src} alt=""/>
        }
        return (
            <div>
                <div className="image-body">
                    {img}
                </div>
                <div className="profile">
                    <div>아이디 : {user.account}</div>
                    <div>이메일 : {user.email}</div>
                    <div>성별 : {user.gender}</div>
                    <div>나이 : {user.age}</div>
                </div>
                <div className="user">
                    <Link to={link} user={user}>
                        {user.name}님
                    </Link>
                </div>
                <div>
                    <Link to= '/' onClick={this.onLogout} >로그아웃</Link>
                </div>
            </div>
        );
    }

    onLogout = () => {
        this.props.stores.UserStore.item = null;
        this.props.stores.UserStore.islogin = false;
    };
}

export default LogoutItem;
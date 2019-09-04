import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import LoginItem from './LoginItem';
import LogoutItem from './LogoutItem';
import Board from  '../Board';
import './home.scss';

@inject('stores')
@observer
class Index extends Component {

    state = {
        count:"10",
        sort:"updated"
    };

    componentDidMount() {
        // this.props.stores.ProductStore.getBestList();
    }

    render() {
        let LoginComponent = null;
        if (this.props.stores.UserStore.islogin) {
            LoginComponent = <LogoutItem />;
        } else {
            LoginComponent = <LoginItem />
        }
        return (
            <div className="home-body">
                <div className="login-move">
                    {LoginComponent}
                </div>
                <Board/>
            </div>
        );
    }

}

export default Index;
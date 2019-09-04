import React, {Component} from 'react';
import Login from './Login';
import Register from './Register';
import './user.scss'
import UserView from "./UserView";
import UserEdit from "./UserEdit";
class Index extends Component {
    render() {

        if(this.props.match && this.props.match.params.command === 'login')
            return <Login/>;

        if(this.props.match && this.props.match.params.command === 'register')
            return <Register/>;

        if(this.props.match && this.props.match.params.userid && this.props.match.params.command === 'view')
            return <UserView userid={this.props.match.params.userid}/>;

        if (this.props.match && this.props.match.params.userid && this.props.match.params.command === 'edit')
            return <UserEdit userid={this.props.match.params.userid}/>;

        return (
            <div></div>
        );
    }
}
export default Index;
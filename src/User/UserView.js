
import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react'
import "../Home/home.scss";
import BoardList from "../Board/BoardList";
@inject('stores')
@observer
class UserView extends Component {
    state = {
        gotoUpdate : false
    };
    componentDidMount() {
        this.props.stores.LikeStore.getTotalLike(this.props.userid);
        this.props.stores.BoardStore.getListByUser(this.props.userid);
    }
    render() {
        if(this.state.gotoUpdate === true)
            return <Redirect to={`/user/edit/${this.props.userid}`}/>;
        return (
            <div className="board-view-item">
                <div className="sub-content">
                    <p>개인정보확인</p>
                </div>
                <div className="post-item">
                    <div className="update-user">
                        <div className="update-user-content">
                            <button onClick={this.updateUser}>개인정보변경</button>
                        </div>
                        <div className="update-user-like">
                            <label>추천수 합계</label>
                            <div>{this.props.stores.LikeStore.likeTotal}</div>
                        </div>
                    </div>
                    <div className="my-post">
                        <label>나의 게시물</label>
                        <hr/>
                        <div className="board-body">
                            <div className="user-header">
                                <ul className='itembar item-title'>
                                    <li>번호</li>
                                    <li>제목</li>
                                    <li>작성자</li>
                                    <li>작성시간</li>
                                    <li>추천 수</li>
                                    <li>조회 수</li>
                                    <li>게시판</li>
                                </ul>
                                {this.props.stores.BoardStore.userlist &&
                                <BoardList
                                    items={this.props.stores.BoardStore.userlist}
                                    islogin={this.props.stores.UserStore.islogin}
                                    isView="mypage"/>}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    updateUser = () => {
        let password = prompt("비밀번호를 입력해주세요.","");
        if (this.props.stores.UserStore.item.password === password){
            this.setState({
                ...this.state,
                gotoUpdate: true
            });

        } else {
            alert("다시입력해주세요.");
            return;
        }
    };

}

export default UserView;
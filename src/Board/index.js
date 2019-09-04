import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import './board.scss';
import BoardList from "./BoardList";
import axios from "axios";
import PostNew from "./PostNew";
import PostView from "./PostView";

@inject('stores')
@observer
class Index extends Component {

    state = {
        count:"10",
        sort:"updated",
        item :[]
    };

    key = 0;

    componentDidMount() {
        if (this.props.match && this.props.match.params.command === 'student'){
            this.props.stores.BoardStore.getKind("updated","학생회");
        } else if(this.props.match && this.props.match.params.command === 'school'){
            this.props.stores.BoardStore.getKind("updated","기숙사");
        } else if(this.props.match && this.props.match.params.command === 'class'){
            this.props.stores.BoardStore.getKind("updated","3학년 1반");
        } else {
            this.props.stores.BoardStore.getList("updated");
        }

    }

    render() {


        if (this.props.match && this.props.match.params.command === 'student'){
            this.props.stores.BoardStore.getKind(this.state.sort,"학생회");
        } else if(this.props.match && this.props.match.params.command === 'school'){
            this.props.stores.BoardStore.getKind(this.state.sort,"기숙사");
        } else if(this.props.match && this.props.match.params.command === 'class'){
            this.props.stores.BoardStore.getKind(this.state.sort,"3학년 1반");
        } else {
            this.props.stores.BoardStore.getList(this.state.sort);
        }

        if(this.props.match && this.props.match.params.command === 'new')
            return <PostNew/>;

        if(this.props.match && this.props.match.params.postid && this.props.match.params.command === 'view' )
            return <PostView postid={this.props.match.params.postid}/>;

        if(this.props.match && this.props.match.params.postid && this.props.match.params.command === 'edit')
            return <PostNew postid={this.props.match.params.postid} />;

        let b = this.props.stores.BoardStore;
        let u = this.props.stores.UserStore;
        return (
            <div className="home-body">
                <div className="main-content">
                    <p>DGSW 게시판</p>
                </div>
                <div className="main-body">
                    <div className="board-sort">
                        <div className="sort-right">
                            <div className="select-sort">
                                <select id="count" name="count"value={this.state.count} onChange={this.updateCount} >
                                    <option value="10">10개</option>
                                    <option value="20">20개</option>
                                    <option value="30">30개</option>
                                </select>
                                <select name="sort" value={this.state.sort} onChange={this.updateSort} >
                                    <option value="updated">최신순</option>
                                    <option value="like_num">추천순</option>
                                    <option value="view_num">조회순</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="board-body">
                        <div className="board-header">
                            <ul className='itembar item-title'>
                                <li>번호</li>
                                <li>제목</li>
                                <li>작성자</li>
                                <li>작성시간</li>
                                <li>추천 수</li>
                                <li>조회 수</li>
                                <li>게시판</li>
                            </ul>
                            {b.items && <BoardList items={b.items} islogin={u.islogin}/>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    updateCount = event => {
        this.setState({
            ...this.state,
            count : event.target.value
        });

    };

    updateSort = event => {
        this.setState({
            ...this.state,
            sort: event.target.value
        });

        if (this.props.match && this.props.match.params.command === 'student'){
            this.props.stores.BoardStore.getKind(event.target.value,"학생회");
        } else if(this.props.match && this.props.match.params.command === 'school'){
            this.props.stores.BoardStore.getKind(event.target.value,"기숙사");
        } else if(this.props.match && this.props.match.params.command === 'class'){
            this.props.stores.BoardStore.getKind(event.target.value,"3학년 1반");
        } else{
            this.props.stores.BoardStore.getList(event.target.value);
        }
    };
}

export default Index;
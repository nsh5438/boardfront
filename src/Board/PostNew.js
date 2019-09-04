import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react'
import axios from "axios";

@inject('stores')
@observer
class PostNew extends Component {

    constructor(props){
        super(props);
        this.state = {
            title : '',
            content : '',
            kind : '',
            id:'',
            userid: this.props.stores.UserStore.item.id,
            author : this.props.stores.UserStore.item.account,
            gotoMain : false,
        };
        if (this.props.postid && this.props.stores.BoardStore.viewitem !== null)
            this.state = {
                ...this.state,
                id: this.props.stores.BoardStore.viewitem.id,
                title: this.props.stores.BoardStore.viewitem.title,
                content: this.props.stores.BoardStore.viewitem.content,
                kind : this.props.stores.BoardStore.viewitem.kind
            };
    }

    render() {
        if(this.state.goToMain)
            return <Redirect to='/' />;
        return (
            <div>
                <div className="sub-content">
                    <p>글 작성</p>
                </div>
                <div className="post-item">
                    <div className="input-box">
                        <label>게시판 :</label>
                        <select name="kind" value={this.state.kind} onChange={this.updateKind} >
                            <option value="기숙사">기숙사</option>
                            <option value="3학년 1반">3학년 1반</option>
                            <option value="학생회">학생회</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>제목 : </label>
                        <input type="text" value={this.state.title} onChange={this.updateTitle}/>
                    </div>
                    <div className="input-box">
                        <label>내용 : </label>
                        {/*<div>*/}
                            <textarea rows="10" value={this.state.content} onChange={this.updateContent}/>
                        {/*</div>*/}
                    </div>
                    <div className="btn_new">
                        <button onClick={this.addNewPost}>확인</button>
                    </div>
                </div>
            </div>
        );
    }


    updateContent = event => {
        this.setState({
            ...this.state,
            content: event.target.value
        });
    };

    updateKind = event => {
        this.setState({
            ...this.state,
            kind: event.target.value
        });
    };


    addNewPost = async () => {

        if (!window.confirm("실행하시겠습니까?")) return false;

        if (this.props.postid && await this.props.stores.BoardStore.updatePost(this.state)) {
            await this.props.stores.BoardStore.getList("updated");
            this.setState({
                ...this.state,
                goToMain: true
            });
        }else if(await this.props.stores.BoardStore.addPost(this.state)) {
            await this.props.stores.BoardStore.getList("updated");
            this.setState({
                ...this.state,
                goToMain: true
            });
        }
    };

    updateTitle = event => {
        this.setState({
            ...this.state,
            title: event.target.value
        });
    };
}

export default PostNew ;
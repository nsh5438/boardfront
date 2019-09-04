
import React, {Component} from 'react';
import {inject,observer} from 'mobx-react'
import {Redirect} from 'react-router-dom';
import {Link} from 'react-router-dom';
import "../Home/home.scss";
@inject('stores')
@observer
class PostView extends Component {
    state = {
        gotoEdit: false,
        gotoMain : false
    };
    componentDidMount() {
        this.props.stores.BoardStore.getView(this.props.postid);

    }
    render() {
        if (this.props.stores.BoardStore.viewitem != null){
            let data = {
                id: this.props.postid,
                view_num : Number(this.props.stores.BoardStore.viewitem.view_num) + 1
            };
            this.props.stores.BoardStore.updateView(data);
        }
        if(this.state.gotoMain === true )
            return <Redirect to='/' />;

        if(this.state.gotoEdit === true)
            return <Redirect to={`/board/edit/${this.props.postid}`}/>;

        let b = this.props.stores.BoardStore;
        let u = this.props.stores.UserStore;
        if (b.viewitem === null)
            return <div/>;

        let btn = {
          btnRemove: null,
          btnUpdate: null
        };

        let like = <div/>;
        if (u.islogin === true ){
            if (u.item.id === b.viewitem.userid){
                btn.btnRemove = <button onClick={this.removePost}>삭제</button>
                btn.btnUpdate = <button onClick={this.updatePost}>수정</button>
            } else {
                like = <button onClick={this.clickLike}>추천</button>
                btn = <div/>
            }
        }

        return (
            <div className="board-view-item">
                <div className="sub-content">
                    <p>글 작성</p>
                </div>
                <div className="post-item">
                    <div className="view-item">
                        게시판 : {b.viewitem.kind}
                    </div>
                    <div className="view-item">
                        제목 : {b.viewitem.title}
                    </div>
                    <div className="view-item">
                        내용 : {b.viewitem.content}
                    </div>
                    <div className="view-item">
                        작성시간 : {new Date(b.viewitem.updated).toLocaleString()}
                    </div>
                    <div className="btn_new">
                        <Link to='/'>목록</Link>
                        {btn.btnRemove}
                        {btn.btnUpdate}
                        {like}
                    </div>
                </div>
            </div>
        );
    }

    removePost = async () => {
        if(window.confirm("삭제하시겠습니까?") === false) return;

        if(await this.props.stores.BoardStore.deletePost(this.props.stores.BoardStore.viewitem.id)) {
            await this.props.stores.BoardStore.getList("updated");
            this.setState({
                ...this.state,
                gotoMain: true
            });
        }
    };

    clickLike = async () => {
        if(window.confirm("추천하시겠습니까?") === false) return ;

        let bs = this.props.stores.BoardStore;
        let us = this.props.stores.UserStore;
        let ls = this.props.stores.LikeStore;

        let update_data = {
          id: bs.viewitem.id,
          like_num : Number(bs.viewitem.like_num) + 1
        };

        let like_data = {
          userid : us.item.id,
          authorid: bs.viewitem.userid,
          boardid : bs.viewitem.id
        };
        if (await bs.updateLike(update_data) && await ls.addLike(like_data)){
            await bs.getList("updated");
            this.setState({
                ...this.state,
                gotoMain: true
            });
        }
    };

    updatePost = () => {
        this.setState({ gotoEdit: true });
    };
}

export default PostView;

import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject,observer} from 'mobx-react'
import "../Home/home.scss";
import BoardList from "../Board/BoardList";
import axios from "axios";
@inject('stores')
@observer
class UserEdit extends Component {
    state = {
        id: this.props.stores.UserStore.item.id,
        account : this.props.stores.UserStore.item.account,
        password : this.props.stores.UserStore.item.password,
        check_password : "",
        name : this.props.stores.UserStore.item.name,
        email : this.props.stores.UserStore.item.email,
        gender : this.props.stores.UserStore.item.gender,
        age : this.props.stores.UserStore.item.age,
        profile_url:null,
        imagename: null,
        file:null,
        gotoMain : false
    };
    render() {

        if(this.state.gotoMain)
            return <Redirect to={"/"}/>;
        return (
            <div>
                <div className="add-content">
                    <div className="add-header">개인정보변경</div>
                    <div className="input-box">
                        <label> 아이디 : </label>
                        <input type="text" value={this.state.account} disabled/>
                    </div>
                    <div className="input-box">
                        <label> 비밀번호 변경 : </label>
                        <input type="password" value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div className="input-box">
                        <label>비밀번호 확인 : </label>
                        <input type="password" value={this.state.check_password} onChange={this.updateCheckPassword}/>
                    </div>
                    <div className="input-box">
                        <label>성명 : </label>
                        <input type="text" value={this.state.name} onChange={this.updateName}/>
                    </div>
                    <div className="input-box">
                        <label>이메일 : </label>
                        <input type="text" value={this.state.email} onChange={this.updateEmail}/>
                    </div>
                    <div className="input-box">
                        <label>성별 :</label>
                        <select name="gender"value={this.state.gender} onChange={this.updateGender} >
                            <option value="남자">남자</option>
                            <option value="여자">여자</option>
                        </select>
                    </div>
                    <div className="input-box">
                        <label>나이 : </label>
                        <input type="number" value={this.state.age} onChange={this.updateAge}/>
                    </div>
                    <div className='upload-file input-box'>

                        <label>프로필 사진 선택</label>
                        <label>
                            <input type='file' onChange={this.changeFile} />
                        </label>
                    </div>

                    <div className="add-button">
                        <button onClick={this.onUpdateUser}>확인</button>
                    </div>
                </div>
            </div>
        );
    }


    onUpdateUser = async () => {
        let user = this.props.stores.UserStore;
        if (this.state.check_password !== this.state.password){
            alert("비밀번호를 확인해주세요.");
            return ;
        }

        let idx = await user.onUpdateUser(this.state);
        const formData = new FormData();
        formData.append('srcFile', this.state.file);
        try {
            let response = await axios({
                url: `http://localhost:8080/upload/${idx}`,
                method: 'post',
                headers: {'content-type': 'multipart/form-data'},
                timeout: 60000,
                data: formData
            });

            if(response.status === 200){
                let data = {
                    id: response.data.userid,
                    profile_url: response.data.savepath,
                    imagename: response.data.originalname
                };
                let insertImage = await axios({
                    url: `http://localhost:8080/user/insertImage`,
                    method: 'put',
                    header:{
                        "Content-Type":"application/json; charset=UTF-8"
                    },
                    timeout: 6000,
                    data: data
                });
            }
        } catch (ex) {
        }
        this.setState({
            ...this.state,
            gotoMain: true
        });

        this.props.stores.UserStore.item = this.state

    };

    updateCheckPassword = event => {
        this.setState({
            ...this.state,
            check_password: event.target.value
        });
    };

    updatePassword = event => {
        this.setState({
            ...this.state,
            password: event.target.value
        });
    };

    updateName = event => {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    };

    updateEmail = event => {
        this.setState({
            ...this.state,
            email: event.target.value
        });
    };

    updateGender = event => {
        this.setState({
            ...this.state,
            gender: event.target.value
        });
    };

    updateAge = event => {
        this.setState({
            ...this.state,
            age: event.target.value
        });
    };

    changeFile = event => {
        if(event.target.files.length > 0) {
            this.setState({
                ...this.state,
                file: event.target.files[0]
            })
        }
    };
}

export default UserEdit;
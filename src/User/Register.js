import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {inject, observer} from 'mobx-react'
import axios from "axios";

@inject('stores')
@observer
class Register extends Component {
    state = {
        id:"",
        account : "",
        password : "",
        check_password:"",
        name: "",
        email:"",
        gender:"남자",
        age:"10대",
        profile_url:null,
        imagename: null,
        file:null,
        gotoLogin : false
    };
    render() {
        if(this.state.gotoLogin)
            return <Redirect to='/user/login' />;
        return (
            <div>
                <div className="add-content">
                    <div className="add-header">회원가입</div>
                    <div className="input-box">
                        <div className="idcheck">
                            <label>희망아이디 :</label>
                            <input type="text" value={this.state.account} onChange={this.updateAccount}/></div>
                        <div>
                            <button onClick={this.CheckId}>중복확인</button>
                        </div>
                    </div>
                    <div className="input-box">
                        <label> 희망비밀번호 : </label>
                        <input type="password" value={this.state.password} onChange={this.updatePassword}/>
                    </div>
                    <div className="input-box">
                        <label>패스워드확인 : </label>
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
                        {/*</select>*/}
                    </div>
                    <div className='upload-file input-box'>

                        <label>프로필 사진 선택</label>
                        <label>
                            <input type='file' onChange={this.changeFile} />
                        </label>
                    </div>
                    <div className="usercheck">
                        <div>회원약관</div>
                        <div className="check-content"></div>
                    </div>
                    <div className="add-button">
                        <button onClick={this.onRegister}>확인</button>
                    </div>
                </div>
            </div>
        );
    }

    CheckId = async () => {
        this.props.stores.UserStore.CheckId(this.state.account);
        setTimeout(()=> {
            if (this.props.stores.UserStore.isCheck){
                alert('사용 가능합니다.');
                return ;
            }else{
                alert('다른 아이디를 사용해주세요.');
                this.setState({
                    ...this.state,
                    account: ''
                });
            }
        },1000);
    };

    onRegister = async () => {
        let user = this.props.stores.UserStore;
        if (this.state.check_password !== this.state.password){
            alert("비밀번호를 확인해주세요.");
            return ;
        }
        if (this.props.userid && await user.updateUser(this.state)) {
            this.setState({
                ...this.state,
                gotoLogin: true
            });
        }

        let idx = await user.onRegister(this.state);
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
                console.log(insertImage)
            }
        } catch (ex) {
        }
        this.setState({
            ...this.state,
            gotoLogin: true
        });

    };

    updateAccount = event => {
        this.setState({
            ...this.state,
            account: event.target.value
        });
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


    uploadFile = async event => {


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
export default Register;
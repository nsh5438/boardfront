import {observable, action} from 'mobx/lib/mobx'
import axios from 'axios'

class UserStore{
    static __instance = null;
    static getInstance(){
        if (UserStore.__instance === null){
            UserStore.__instance = new UserStore();
        }
        return UserStore.__instance;
    }

    constructor() {
        UserStore.__instance = this;

    }

    @action onRegister = async (newUser) => {
        try{
            let response = await axios({
                url: `http://localhost:8080/user/register`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                timeout: 6000,
                data: newUser
            });
            let idx = await axios({
                url: `http://localhost:8080/user/findByAccount/` + newUser.account,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 6000
            });
            if(response.status === 200){
                return idx.data.id;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action onUpdateUser = async (data) => {
        try{
            let response = await axios({
                url: `http://localhost:8080/user/update`,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'put',
                timeout: 6000,
                data: data
            });
            let idx = await axios({
                url: `http://localhost:8080/user/findByAccount/` + data.account,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 6000
            });
            if(response.status === 200){
                return idx.data.id;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @observable isCheck = true;
    @action CheckId = async (account) =>{
        try{
            let response = await axios({
                url: `http://localhost:8080/user/findByAccount/` + account,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 6000
            });
            if (response.status === 200){
                if (response.data === ''){
                    this.isCheck = true;
                }else if(response.data !== ''){
                    this.isCheck = false;
                }
                console.log(this.isCheck)
            }

        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };


    @observable item = null;
    @observable islogin = false;
    @action onLogin = async (user) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/user/login',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                timeout: 6000,
                data:user
            });
            if (response.status === 200){
                this.item = response.data;
                if (this.item !== ""){
                    this.islogin = true;
                    return true;
                }
                alert('아이디와 비밀번호가 맞지 않습니다.');
                return false;
            }
        }
        catch (e) {
            alert(e.toString());
            return false;
        }
    };
}

export default UserStore.getInstance();
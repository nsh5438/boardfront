import {observable, action} from 'mobx/lib/mobx'
import axios from 'axios'

class BoardStore{
    static __instance = null;
    static getInstance(){
        if (BoardStore.__instance === null){
            BoardStore.__instance = new BoardStore();
        }
        return BoardStore.__instance;
    }

    constructor() {
        BoardStore.__instance = this;

    }

    @observable items = null;
    @action getList = async (sort) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/board/getList/' + sort,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 3000
            });

            if (response.status === 200){
                this.items = response.data
                return true;
            }
        }catch (e) {
            alert(e.toString())
            return false;
        }
    };

    @observable userlist = null;
    @action getListByUser = async (id) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/board/getListByUser/' + id,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 3000
            });

            if (response.status === 200){
                this.userlist = response.data
            }
        }catch (e) {
            alert(e.toString())
        }
    };

    @action getKind = async (sort,kind) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/board//getList/'+sort + '?kind=' + kind,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout: 3000
            });
            if (response.status === 200){
                this.items = response.data
            }
        }catch (e) {
            alert(e.toString())
        }
    };

    @action addPost = async (data) => {
        try{
            let response = await axios({
                url:'http://localhost:8080/board/addPost',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'post',
                data:data,
                timeout: 500
            });
            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    }

    @observable viewitem = null;
    @action getView = async (id) => {
        try {
            let response = await axios({
                url:'http://localhost:8080/board/getView/' + id,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'get',
                timeout:600
            });
            if(response.status === 200){
                this.viewitem = response.data;
            }
        }catch (e) {
            alert(e.toString());
        }
    };

    @action updateLike = async (data) => {
        try {
            let response = await axios({
                url:'http://localhost:8080/board/updateLike',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'put',
                data:data,
                timeout:600
            });
            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action updateView= async (data) => {
        try {
            let response = await axios({
                url:'http://localhost:8080/board/updateView',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'put',
                data:data,
                timeout:600
            });
            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action updatePost= async (data) => {
        try {
            let response = await axios({
                url:'http://localhost:8080/board/updatePost',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'put',
                data:data,
                timeout:600
            });
            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @action deletePost= async (id) => {
        try {
            let response = await axios({
                url:'http://localhost:8080/board/deletePost/' + id,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method:'delete',
                timeout:600
            });
            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    }

}

export default BoardStore.getInstance();
import {observable, action} from 'mobx/lib/mobx'
import axios from 'axios'

class LikeStore{
    static __instance = null;
    static getInstance(){
        if (LikeStore.__instance === null){
            LikeStore.__instance = new LikeStore();
        }
        return LikeStore.__instance;
    }

    constructor() {
        LikeStore.__instance = this;

    }

    @action addLike = async (data) => {
        try{
            let response = await axios({
                url: 'http://localhost:8080/like/addLike',
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'post',
                data:data,
                timeout: 3000
            });

            if (response.status === 200){
                return true;
            }
        }catch (e) {
            alert(e.toString());
            return false;
        }
    };

    @observable likeTotal = null;
    @action getTotalLike = async (id) => {
        try {
            let response = await axios ({
                url:'http://localhost:8080/like/getTotalLike/' + id,
                header:{
                    "Content-Type":"application/json; charset=UTF-8"
                },
                method: 'get',
                timeout:3000
            });

            if (response.status === 200){
                this.likeTotal = response.data;
            }
        }catch (e) {
            alert(e.toString());
        }
    }

}

export default LikeStore.getInstance();
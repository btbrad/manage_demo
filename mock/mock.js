import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import {Admin} from './data/user'
import {PlayerList} from './data/Player'

export default {
    start(){
        let mock = new MockAdapter(axios);

        mock.onPost('/api/login').reply(arg =>{
            let {username,password} = JSON.parse(arg.data);
            return new Promise((resolve,reject) =>{
                let admin = null;
                setTimeout(() =>{
                    let hasAdmin = Admin.some(u =>{
                        if(u.username===username && u.password === password){
                            admin = JSON.parse(JSON.stringify(u));
                            delete admin.password;
                            return true
                        }
                    })
                    if(hasAdmin){
                        resolve([200, {code: 200, msg: '请求成功', admin}])
                    }else{
                        resolve([200, {code: 500, msg: '账号或密码错误'}])
                    }
                },1000)
            })
        });

        mock.onGet('/api/PlayerList').reply(config =>{
            let mockPlayers = PlayerList;
            return new Promise((resolve,reject) =>{
                setTimeout(() =>{
                    resolve([200,{players:mockPlayers}]);
                },200);
            });
        });
    }
}

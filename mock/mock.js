import axios from 'axios'
import Mock from 'mockjs'
import MockAdapter from 'axios-mock-adapter'

import {Admin} from './data/user'
import {PlayerList} from './data/Player'

export default {
    start(){
        let mock = new MockAdapter(axios);

        mock.onPost('/api/login').reply(arg =>{
            console.log(arg);
            let {username,password} = JSON.parse(arg.data);
            console.log(username,password);
            return new Promise((resolve,reject) =>{
                let admin = null;
                setTimeout(() =>{
                    let hasAdmin = Admin.some(u =>{
                        if(u.username===username && u.password === password){
                            admin = JSON.parse(JSON.stringify(u));
                            // sessionStorage里不存密码
                            delete admin.password;
                            delete admin.type;
                            return true
                        }
                    });
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

        mock.onGet('/api/changePW').reply(config =>{
            console.log(config);
            let {id,username,password} = config;
            PlayerList.some(u =>{
                if((u.id===id)&&(u.username===username)){
                    u.password=password;
                    return true;
                }else{
                    return false;
                }
            });
            return new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    resolve([200,{code:200,msg:'修改成功！'}])
                },500)
            })
        });

        mock.onGet('/api/AdminList').reply(config =>{
            let mockAdmins = Admin;
            return new Promise((resolve,reject) =>{
                setTimeout(() =>{
                    resolve([200,{Admins:mockAdmins}]);
                },200);
            });
        });

        mock.onGet('/api/changeProfile').reply(config =>{
            console.log(config);
            let {id,username,password,type,email} = config;
            Admin.some(u =>{
                if(u.id===id){
                    u.username=username;
                    u.password=password;
                    u.type=type;
                    u.email = email
                    return true;
                }else{
                    return false;
                }
            });
            return new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    resolve([200,{code:200,msg:'修改成功！'}])
                },500)
            })
        });

        mock.onPost('/api/addUser').reply(config => {
            let arg = JSON.parse(config.data);
            console.log(config);
            Admin.push({
                id: Mock.Random.guid(),
                username:arg.username,
                password:arg.password,
                type:arg.type,
                email:arg.email,
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve([200,{code:200,msg:'新增成功！'}]);
                }, 200);
            });
        });

        mock.onGet('/api/changeAdminPW').reply(config =>{
            console.log(config);
            let  id = config.id;
            let username = config.username;
            let newPassword = config.newPassword;
            Admin.some(u =>{
                if((u.id===id)&&(u.username===username)){
                    u.password=newPassword;
                    console.log(u);
                    return true;
                }else{
                    return false;
                }
            });
            return new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    resolve([200,{code:200,msg:'修改成功！'}])
                },500)
            })
        });

        mock.onGet('/api/changeAdminProfile').reply(config =>{
            console.log(config);
            let {id,username,email} = config;
            Admin.some(u =>{
                if((u.id===id)&&(u.username=username)){
                    u.email = email;
                    return true;
                }else{
                    return false;
                }
            });
            return new Promise((resolve,reject) =>{
                setTimeout(()=>{
                    resolve([200,{code:200,msg:'修改成功！'}])
                },500)
            })
        });

        mock.onPost('/api/getUserType').reply(arg =>{
            let {id,username} = JSON.parse(arg.data);
            return new Promise((resolve,reject) =>{
                let UserType = null;
                setTimeout(() =>{
                    let hasAdmin = Admin.some(u =>{
                        if(u.username===username && u.id === id){
                                UserType = u.type;
                                return true
                        }
                    });
                    if(hasAdmin){
                        resolve([200, {code: 200, msg: '请求成功',UserType}])
                    }
                },1000)
            })
        });

    }
};

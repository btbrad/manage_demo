import {reqLogin} from "../../api/api";


const state = {
    accessUser: {
        username: '',
        id: '',
        email: ''
    }
};

const getters = {
    username : state=> state.accessUser.username,
    id : state => state.accessUser.id,
    email : state => state.accessUser.email,
    accessUser:state => state.accessUser,
};

const actions = {

    // 登入
    Login({ commit },loginForm){
        const username = loginForm.username.trim();
        const password = loginForm.password;
        let params ={username,password};
        console.log(params);
        return new Promise((resolve,reject) =>{
            reqLogin(params).then(response =>{
                console.log(response);
                let data = response.admin;
                // commit('updateUsername',data.username);
                // commit('updateId',data.id);
                // commit('updateEmail',data.email);
                commit('updateAccessUser',data);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    },

    Logout({ commit}){
        commit('updateAccessUser','');
    }


};

const mutations = {
    // updateUsername(state,username){
    //     state.username = username;
    // },
    // updateId(state,id){
    //     state.id = id;
    // },
    // updateEmail(state,email){
    //     state.email = email;
    // },
    updateAccessUser(state,accessUser) {
        state.accessUser = accessUser;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}

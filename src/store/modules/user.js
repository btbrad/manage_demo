import {reqLogin} from "../../api/api";


const state = {
    username:'',
    id:'',
    email:''
};

const getters = {
    username : state=> state.username,
    id : state => state.id,
    email : state => state.email
};

const actions = {
    Login({ commit },loginForm){
        const username = loginForm.username.trim();
        const password = loginForm.password;
        let params ={username,password};
        console.log(params);
        return new Promise((resolve,reject) =>{
            reqLogin(params).then(response =>{
                console.log(response);
                let data = response.admin;
                commit('updateUsername',data.username);
                commit('updateId',data.id);
                commit('updateEmail',data.email);
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        })
    }
};

const mutations = {
    updateUsername(state,username){
        state.username = username;
    },
    updateId(state,id){
        state.id = id;
    },
    updateEmail(state,email){
        state.email = email;
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
}

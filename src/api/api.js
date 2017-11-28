import axios from 'axios'

export const reqLogin = params =>{
    return axios.post('/api/login',params).then(res => res.data);
};

export const getPlayerList = params =>{
    return axios.get('/api/PlayerList',{ params:params });
};

export const reqChangePW = params =>{
    return axios.get('/api/changePW',params).then(res => res.data);
};

export const getAdminList = params => {
    return axios.get('/api/AdminList',{ params:params });
};

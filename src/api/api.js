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

export const reqChangeProfile = params =>{
    return axios.get('/api/changeProfile',params).then(res => res.data);
};

export const addAdmin = params =>{
  return axios.post('/api/addUser',params).then(res => res.data)
};

export const reqChangeAdminPW = params =>{
    return axios.get('/api/changeAdminPW',params).then(res => res.data);
};

export const reqChangeAdminProfile = params =>{
    return axios.get('/api/changeAdminProfile',params).then(res => res.data);
};

export const reqUserType = params =>{
    return axios.post('/api/getUserType',params).then(res => res.data);
};

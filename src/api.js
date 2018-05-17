import axios from 'axios';

let base = '/api';

// 登录
export const login = params => { return axios.post(base + '/user/login', params); };

// 注册
export const register = params => { return axios.post(base + '/user/register', params); };

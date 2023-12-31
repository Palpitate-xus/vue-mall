import axios from 'axios';

// 创建 Axios 实例
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/',
});

// 在请求发送前拦截请求
axiosInstance.interceptors.request.use(
  config => {
    // 从本地存储中获取 Token
    const token = localStorage.getItem('token') || '';
    // 将 Token 添加到请求的 Headers 中
    config.headers.Authorization = `${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 在响应返回后拦截响应
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

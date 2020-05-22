import axios from 'axios'
import { Loading } from 'element-ui';

export default function post(config) {
    const instance = axios.create({
        // baseURL: 'http://47.97.204.150:5003',
        baseURL: 'v5',
        timeout: 5000,
        withCredentials: true,
        headers: {token: localStorage.getItem('token'),}
    })
    let data = JSON.stringify(config.data)
    let url = config.url

    let options = {
        lock: true,
        text: 'Loading',
        background: 'rgba(255, 255, 255, 0.5)'
      }
      
    instance.interceptors.request.use(config => {
        Loading.service(options);
        return config;
      })
      
    instance.interceptors.response.use(res => {
        let loadingInstance = Loading.service(options);
        loadingInstance.close();
        return res
      })
    
    return new Promise((resolve, reject) => {
        instance({
            method: 'post',
            url,
            data,
        }).then(response => {
            
            resolve(response)
        }).catch(error => {
            
            reject(error)
        })
    })
}
import axios from "axios";

export function request(config){
    const instance = axios.create({
        baseURL: 'http://123.207.32.32:8000',
        timeout: 5000
    })
    //2.2响应拦截
    instance.interceptors.response.use(res=>{
        return res.data;
    },err=>{
        return err;
    })

    //3.发送真正的网络请求
    return instance(config)
}
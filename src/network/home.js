import {request} from "./request";

//获取首页列表
export function getHomeMultiData(){
    return request({
        url:'/home/multidata'
    })
}
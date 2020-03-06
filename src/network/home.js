import {request} from "./request";

//获取首页列表
export function getHomeMultiData() {
  return request({
    url: '/home/multidata'
  })
}

//获取首页商品
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type: type,
      page: page
    }
  })
}

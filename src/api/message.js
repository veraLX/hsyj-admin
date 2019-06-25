import axios from '@/libs/api.request'

export const getMessageList = (data) => { // 0 景点    1 活动
  return axios.request({
    url: 'admin/discuss/list?pageindex=' + data.page + '&pagesize=' + data.pagesize + '&distype=' + data.distype,
    method: 'get'
  })
}

export const getSpecialMessageList = (data) => { // 1 1 活动景点
  return axios.request({
    url: 'admin/discuss/list?pageindex=' + data.page + '&pagesize=' + data.pagesize + '&distype=' + data.distype + '&scenerytype' + data.scenerytype,
    method: 'get'
  })
}

export const acceptMessage = (obj) => {
  return axios.request({
    url: 'admin/discuss/update?id=' + obj.id + '&shstate=' + obj.shstate,
    method: 'get'
  })
}

export const recommendMessage = (obj) => {
  return axios.request({
    url: 'admin/discuss/update?id=' + obj.id + '&isrecommend=' + obj.isrecommend,
    method: 'get'
  })
}

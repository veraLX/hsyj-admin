import axios from '@/libs/api.request'

export const getMessageList = (data) => {
  return axios.request({
    url: 'api/discuss/list?pageindex=' + data.page + '&pagesize=' + data.pagesize + '&distype=' + data.distype,
    method: 'get'
  })
}

export const acceptMessage = (obj) => {
  return axios.request({
    url: 'api/admin/discuss/update?id=' + obj.id + '&shstate=' + obj.shstate,
    method: 'get'
  })
}

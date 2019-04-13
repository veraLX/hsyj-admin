import axios from '@/libs/api.request'

export const getMessageList = () => {
  return axios.request({
    url: '/discuss/list?pageindex=1&pagesize=10',
    method: 'get'
  })
}

export const acceptMessage = (obj) => {
  return axios.request({
    url: 'discuss/update?id=' + obj.id + '&shstate=' + obj.shstate,
    method: 'get'
  })
}

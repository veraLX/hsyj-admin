import axios from '@/libs/api.request'

// 20、活动2列表,get
export const getActivity2List = (page, size) => {
  return axios.request({
    url: `/activity/list2?page=${page}&size=${size}`,
    method: 'get'
  })
}

// 18、添加修改活动1,post
export const editActivity1 = (id) => {
  return axios.request({
    url: `/activity/addEdit1?id=${id}`,
    method: 'post'
  })
}

// 19、添加/修改活动2,post,activityid活动id,必填，id修改时传
export const editActivity2 = (activityid, id) => {
  return axios.request({
    url: `activity/addEdit2?activityid=${activityid}&id=${id}`,
    method: 'post'
  })
}

// 21、删除/解绑活动,get
export const deleteActivity1 = (id) => {
  return axios.request({
    url: `/activity/delete?id=${id}`,
    method: 'get'
  })
}

// 22、删除活动问题,get
export const deleteActivity2 = (id) => {
  return axios.request({
    url: `/activity/delete?id=${id}`,
    method: 'get'
  })
}

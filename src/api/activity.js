import axios from '@/libs/api.request'

// 44、后台活动列表1,get
export const getActivity1List = (page, size) => {
  return axios.request({
    url: `activity/list?page=${page}&size=${size}`,
    method: 'get'
  })
}

// 20、活动2列表,get
// export const getActivity2List = (page, size) => {
//   return axios.request({
//     url: `/activity/list2?page=${page}&size=${size}`,
//     method: 'get'
//   })
// }

// 18、添加修改活动1,post
export const addActivity = (obj) => {
  const data = {
    'activityname': obj.activityname,
    'sponsor': obj.sponsor,
    'meetingplace': obj.meetingplace,
    'secondsponsor': obj.secondsponsor,
    'needschoolrang': obj.needschoolrang,
    'startdate': obj.startdate,
    'enddate': obj.enddate,
    'shdesc': obj.shdesc,
    'shstate': obj.shstate,
    'startaddress': obj.startaddress,
    'needschoolpass': obj.needschoolpass,
    'needscenerypass': obj.needscenerypass,
    'settingstart': obj.settingstart,
    'startsceneryid': obj.startsceneryid,
    'settingend': obj.settingend,
    'endsceneryid': obj.endsceneryid,
    'isgroup': obj.isgroup,
    'groupnum': obj.groupnum
  }
  return axios.request({
    url: `/activity/addEdit1`,
    data,
    method: 'post'
  })
}

export const editActivity = (obj, id) => {
  const data = {
    'activityname': obj.activityname,
    'sponsor': obj.sponsor,
    'meetingplace': obj.meetingplace,
    'secondsponsor': obj.secondsponsor,
    'needschoolrang': obj.needschoolrang,
    'startdate': obj.startdate,
    'enddate': obj.enddate,
    'shdesc': obj.shdesc,
    'shstate': obj.shstate,
    'startaddress': obj.startaddress,
    'needschoolpass': obj.needschoolpass,
    'needscenerypass': obj.needscenerypass,
    'settingstart': obj.settingstart,
    'startsceneryid': obj.startsceneryid,
    'settingend': obj.settingend,
    'endsceneryid': obj.endsceneryid,
    'isgroup': obj.isgroup,
    'groupnum': obj.groupnum
  }
  return axios.request({
    url: `/activity/addEdit1?id=${id}`,
    data,
    method: 'post'
  })
}

// 19、添加/修改活动2,post,activityid活动id,必填，id修改时传
// export const editActivity2 = (activityid, id) => {
//   return axios.request({
//     url: `activity/addEdit2?activityid=${activityid}&id=${id}`,
//     method: 'post'
//   })
// }

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

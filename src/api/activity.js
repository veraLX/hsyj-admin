import axios from '@/libs/api.request'

// 44、后台活动列表1,get
export const getActivity1List = (page, size) => {
  return axios.request({
    url: `admin/activity/list?pageindex=${page}&pagesize=${size}`,
    method: 'get'
  })
}

// 18、添加修改活动1,post
export const addActivity = (obj) => {
  const data = {
    'activityname': obj.activityname,
    'sponsor': obj.sponsor,
    'meetingplace': obj.meetingplace,
    'secondsponsor': obj.secondsponsor,
    'needschoolrang': obj.needschoolrang,
    'needsceneryrang': obj.needsceneryrang,
    'startdate': obj.startdate,
    'enddate': obj.enddate,
    'shdesc': obj.shdesc,
    'shstate': 0,
    'startaddress': obj.startaddress,
    'needschoolpass': obj.needschoolpass,
    'needscenerypass': obj.needscenerypass,
    'settingstart': obj.settingstart,
    'startsceneryid': obj.startsceneryid,
    'settingend': obj.settingend,
    'endsceneryid': obj.endsceneryid,
    'isgroup': obj.isgroup,
    'groupnum': obj.groupnum,
    'isrecommend': obj.isrecommend
  }
  return axios.request({
    url: `admin/activity/addEdit1`,
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
    'needsceneryrang': obj.needsceneryrang,
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
    'groupnum': obj.groupnum,
    'isrecommend': obj.isrecommend
  }
  return axios.request({
    url: `admin/activity/addEdit1?id=${id}`,
    data,
    method: 'post'
  })
}

// 21、删除/解绑活动,get
export const deleteActivity1 = (id) => {
  return axios.request({
    url: `admin/activity/delete?id=${id}`,
    method: 'get'
  })
}

// 36、活动详情页-团队参，get
export const getActivityByGroup = (id) => {
  return axios.request({
    url: `api/activity/getactivitydetailForGroup?id=${id}&studentid=1`,
    method: 'get'
  })
}

// 31、活动详情页-个人参赛方式，get
export const getActivityBySelf = (id) => {
  return axios.request({
    url: `api/activity/getactivitydetail?id=${id}&studentid=1`,
    method: 'get'
  })
}

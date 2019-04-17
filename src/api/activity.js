import axios from '@/libs/api.request'

// 44、后台活动列表1,get
export const getActivity1List = (page, size) => {
  return axios.request({
    url: `activity/list?pageindex=${page}&pagesize=${size}`,
    method: 'get'
  })
}

// 18、添加修改活动1,post
export const addActivity = (obj) => {
  const data = {
    'activityName': obj.activityName,
    'sponsor': obj.sponsor,
    'meetingplace': obj.meetingplace,
    'secondsponsor': obj.secondsponsor,
    'needschoolrang': obj.needschoolrang,
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
    'activityName': obj.activityName,
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
    'groupnum': obj.groupnum
  }
  return axios.request({
    url: `/activity/addEdit1?id=${id}`,
    data,
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

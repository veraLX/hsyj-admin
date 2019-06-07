import axios from '@/libs/api.request'

export const addSchool = (obj) => {
  const data = {
    'schoolname': obj.schoolname,
    'province': obj.province,
    'city': obj.city, // 所属区县
    'address': obj.address,
    'schooldesc': obj.schooldesc,
    'sourceaddress': obj.sourceaddress,
    'longitude': obj.longitude, // 经度
    'latitude': obj.latitude, // 纬度
    'soundurl': obj.soundurl,
    'videourl': obj.videourl,
    'areaid': obj.areaid,
    'parentid': obj.parentid, // 本条是分校区
    'shortname': obj.shortname
  }

  return axios.request({
    url: 'admin/school/addEdit',
    data,
    method: 'post'
  })
}

export const getSchoolList = (data) => {
  return axios.request({
    url: 'admin/school/index?pageindex=' + data.page + '&pagesize=' + data.pageSize,
    method: 'get'
  })
}
export const getAllSchoolList = (data) => {
  return axios.request({
    url: 'api/school/index?pageindex=' + data.page + '&pagesize=' + data.pageSize,
    method: 'get'
  })
}

export const getParentSchoolList = (data) => {
  return axios.request({
    url: 'api/school/indexOrgList?pageindex=' + data.page + '&pagesize=' + data.pageSize,
    method: 'get'
  })
}

export const getArea = () => {
  return axios.request({
    url: 'api/school/getArea',
    method: 'get'
  })
}

export const deleteSchool = (data) => {
  return axios.request({
    url: 'admin/school/delete?id=' + data,
    method: 'get'
  })
}

export const editSchool = (obj) => {
  const data = {
    'schoolname': obj.schoolname,
    'province': obj.province,
    'city': obj.city, // 所属区县
    'address': obj.address,
    'schooldesc': obj.schooldesc,
    'sourceaddress': obj.sourceaddress,
    'longitude': obj.longitude, // 经度
    'latitude': obj.latitude, // 纬度
    'soundurl': obj.soundurl,
    'videourl': obj.videourl,
    'areaid': obj.areaid,
    'parentid': obj.parentid, // 本条是分校区
    'shortname': obj.shortname
  }
  return axios.request({
    url: 'admin/school/addEdit?id=' + obj.schoolID,
    data,
    method: 'post'
  })
}

import axios from '@/libs/api.request'

export const addScenery = (obj) => {
  const data = {
    'scenerytitle': obj.scenerytitle,
    'address': obj.address,
    'schoolid': obj.schoolid,
    'shdesc': obj.shdesc,
    'sourceaddress': obj.sourceaddress,
    'longitude': obj.longitude,
    'latitude': obj.latitude,
    'soundurl': obj.soundurl,
    'videourl': obj.videourl
  }
  return axios.request({
    url: 'admin/scenery/addEdit',
    data,
    method: 'post'
  })
}

export const editScenery = (obj) => {
  const data = {
    'scenerytitle': obj.scenerytitle,
    'schoolid': obj.schoolid,
    'address': obj.address,
    'shdesc': obj.shdesc,
    'sourceaddress': obj.sourceaddress,
    'longitude': obj.longitude,
    'latitude': obj.latitude,
    'soundurl': obj.soundurl,
    'videourl': obj.videourl
  }
  return axios.request({
    url: 'admin/scenery/addEdit?id=' + obj.sceneryID,
    data,
    method: 'post'
  })
}

export const sceneryList = (currentPage, pageSize) => {
  return axios.request({
    url: 'api/scenery/index?pageindex=' + currentPage + '&pagesize=' + pageSize,
    method: 'get'
  })
}

export const sceneryDelete = (id) => {
  return axios.request({
    url: 'admin/scenery/delete?id=' + id,
    method: 'get'
  })
}

export const getSceneryFromSchool = (idArray) => {
  return axios.request({
    url: 'api/scenery/getSceneryListBySchoolids?schoolids=' + idArray,
    method: 'get'
  })
}

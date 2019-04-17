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
    url: 'scenery/addEdit',
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
    url: 'scenery/addEdit?id=' + obj.sceneryID,
    data,
    method: 'post'
  })
}

export const sceneryList = (currentPage, pageSize) => {
  return axios.request({
    url: 'scenery/index?page=' + currentPage + '&size=' + pageSize,
    method: 'get'
  })
}

export const sceneryDelete = (id) => {
  return axios.request({
    url: 'scenery/delete?id=' + id,
    method: 'get'
  })
}

export const getSceneryFromSchool = (idArray) => {
  return axios.request({
    url: '/scenery/getSceneryListBySchoolids?schoolids=' + idArray,
    method: 'get'
  })
}

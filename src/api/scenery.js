import axios from '@/libs/api.request'

export const addScenery = (obj) => {
  const data = {
    'scenerytitle': obj.scenerytitle,
    'address': obj.address,
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

export const sceneryList = () => {
  return axios.request({
    url: 'scenery',
    method: 'get'
  })
}

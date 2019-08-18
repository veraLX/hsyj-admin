import axios from '@/libs/api.request'

export const getTableData = () => {
  return axios.request({
    url: 'get_table_data',
    method: 'get'
  })
}

export const getDragList = () => {
  return axios.request({
    url: 'get_drag_list',
    method: 'get'
  })
}

export const errorReq = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}

export const saveErrorLogger = info => {
  return axios.request({
    url: 'save_error_logger',
    data: info,
    method: 'post'
  })
}

export const uploadImg = formData => {
  return axios.request({
    url: 'image/upload',
    data: formData
  })
}

export const getOrgData = () => {
  return axios.request({
    url: 'get_org_data',
    method: 'get'
  })
}

export const getTreeSelectData = () => {
  return axios.request({
    url: 'get_tree_select_data',
    method: 'get'
  })
}

export const deleteOneImage = (sourceid) => {
  return axios.request({
    url: `admin/source/delete?sourceid=${sourceid}`,
    method: 'get'
  })
}

export const getImageList = (targetid, sourcetype) => {
  return axios.request({
    url: `api/source/getListBytargetidAndSourceType?targetid=${targetid}&sourcetype=${sourcetype}`,
    method: 'get'
  })
}

export const index = (action) => {
  return axios.request({
    url: `admin/count/` + action,
    method: 'get'
  })
}

export const mindex = (action, id) => {
  return axios.request({
    url: `admin/mcount/` + action + '?schoolId=' + id,
    method: 'get'
  })
}

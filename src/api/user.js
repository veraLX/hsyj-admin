import axios from '@/libs/api.request'

export const login = (username, pwd, captchacode) => {
  const data = {
    username,
    pwd,
    captchacode
  }
  return axios.request({
    url: 'api/admin/auth/adminLogin',
    data,
    method: 'post'
  })
}

export const getUserInfo = (sysuserid) => {
  return axios.request({
    url: `api/admin/auth/getUserInfo?sysuserid=${sysuserid}`,
    method: 'get'
  })
}

export const logout = () => {
  return axios.request({
    url: 'api/admin/auth/adminLogout',
    method: 'get'
  })
}

export const getUnreadCount = () => {
  return axios.request({
    url: 'message/count',
    method: 'get'
  })
}

export const getMessage = () => {
  return axios.request({
    url: 'message/init',
    method: 'get'
  })
}

export const getContentByMsgId = msg_id => {
  return axios.request({
    url: 'message/content',
    method: 'get',
    params: {
      msg_id
    }
  })
}

export const hasRead = msg_id => {
  return axios.request({
    url: 'message/has_read',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const removeReaded = msg_id => {
  return axios.request({
    url: 'message/remove_readed',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const restoreTrash = msg_id => {
  return axios.request({
    url: 'message/restore',
    method: 'post',
    data: {
      msg_id
    }
  })
}

export const addUser = (obj) => {
  const data = {
    'userName': obj.userName,
    'pwd': obj.pwd,
    'usertype': obj.usertype,
    'schoolid': obj.schoolid
  }

  return axios.request({
    url: 'api/admin/user/save',
    data,
    method: 'post'
  })
}

export const getUserList = (data) => {
  return axios.request({
    url: 'api/user/getUserListBySchoolid?schoolid=' + data,
    method: 'get'
  })
}

export const editUser = (obj) => {
  const data = {
    'userName': obj.userName,
    'pwd': obj.pwd,
    'usertype': obj.usertype,
    'schoolid': obj.schoolid
  }

  return axios.request({
    url: 'api/admin/user/save?userid=' + obj.sysUserID,
    data,
    method: 'post'
  })
}

export const deleteUser = (data) => {
  return axios.request({
    url: 'api/admin/user/delete?userid=' + data,
    data,
    method: 'get'
  })
}

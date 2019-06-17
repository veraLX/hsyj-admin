import axios from '@/libs/api.request'

export const getStudentList = (obj) => {
  const data = {
    'stuno': obj.stuno,
    'studentname': obj.studentname,
    'tel': obj.tel,
    'wxchat': obj.wxchat
  }

  return axios.request({
    url: 'admin/student/getStudentList',
    data,
    method: 'post'
  })
}

export const checkStudent = (studentid, shstate) => {
  return axios.request({
    url: `admin/student/updateStatus?studentid=${studentid}&shstate=${shstate}`,
    method: 'get'
  })
}

export const deleteStudent = (studentid) => {
  return axios.request({
    url: `admin/student/delete?id=${studentid}`,
    method: 'get'
  })
}

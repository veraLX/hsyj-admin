import axios from '@/libs/api.request'

export const getStudentList = (obj) => {
  const data = {
    'stuno': obj.stuno,
    'studentname': obj.studentname,
    'tel': obj.tel,
    'wxchat': obj.wxchat
  }

  return axios.request({
    url: 'student/getStudentList',
    data,
    method: 'post'
  })
}

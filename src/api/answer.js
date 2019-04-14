import axios from '@/libs/api.request'

export const getQuestionbyActid = (id) => {
  return axios.request({
    url: 'question/getQuestionbyActid?id=' + id,
    method: 'get'
  })
}

export const getAnswerList = (page, size) => {
  return axios.request({
    url: 'activity/list2?page=' + page + '&size=' + size,
    method: 'get'
  })
}

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

export const addAnswer = (obj, activityid) => {
  const data = {
    sceneryid: obj.sceneryid,
    questiontitle: obj.questiontitle,
    answera: obj.answera,
    answerb: obj.answerb,
    answerc: obj.answerc,
    answerd: obj.answerd,
    rightanswer: obj.rightanswer
  }
  return axios.request({
    url: `activity/addEdit2?activityid=${activityid}`,
    data,
    method: 'post'
  })
}

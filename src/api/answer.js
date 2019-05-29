import axios from '@/libs/api.request'

export const getQuestionbyActid = (id) => {
  return axios.request({
    url: 'api/question/getQuestionbyActid?id=' + id,
    method: 'get'
  })
}

export const getAnswerList = (page, size, activityId) => {
  return axios.request({
    url: 'api/activity/list2?pageindex=' + page + '&pagesize=' + size + '&activityid=' + activityId,
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
    url: `admin/activity/addEdit2?activityid=${activityid}`,
    data,
    method: 'post'
  })
}

export const deleteAnswer = (questionID, activityID, sceneryID) => {
  return axios.request({
    url: 'admin/activity/delete2?id=' + questionID + '&activityid=' + activityID + '&sceneryid=' + sceneryID,
    method: 'get'
  })
}

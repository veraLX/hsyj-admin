import {
  login,
  logout,
  getUserInfo,
  getMessage,
  getContentByMsgId,
  hasRead,
  removeReaded,
  restoreTrash
  // getUnreadCount
} from '@/api/user'
import { setToken, getToken, setSessionUser } from '@/libs/util'
import { Notice } from 'iview'

export default {
  state: {
    userName: '',
    schoolId: 0,
    usertype: 0,
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    unreadCount: 0,
    messageUnreadList: [],
    messageReadedList: [],
    messageTrashList: [],
    messageContentStore: {}
  },
  mutations: {
    setAvatar (state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setSchoolId (state, schoolId) {
      state.schoolId = schoolId
    },
    setSysUserID (state, sysUserID) {
      state.sysUserID = sysUserID
    },
    setUserType (state, usertype) {
      state.usertype = usertype
    },
    setUser (state, user) {
      let access = ''
      if (user.usertype === 1) {
        access = 'systemAdministrator'
      } else {
        access = 'schoolAdministrator'
      }
      user.access = [access]
      state.user = user
      setSessionUser(user)
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setMessageReadedList (state, list) {
      state.messageReadedList = list
    },
    setMessageTrashList (state, list) {
      state.messageTrashList = list
    },
    updateMessageContentStore (state, { msg_id, content }) {
      state.messageContentStore[msg_id] = content
    },
    moveMsg (state, { from, to, msg_id }) {
      const index = state[from].findIndex(_ => _.msg_id === msg_id)
      const msgItem = state[from].splice(index, 1)[0]
      msgItem.loading = false
      state[to].unshift(msgItem)
    }
  },
  getters: {
    messageUnreadCount: state => state.messageUnreadList.length,
    messageReadedCount: state => state.messageReadedList.length,
    messageTrashCount: state => state.messageTrashList.length
  },
  actions: {
    // 登录
    handleLogin ({ commit }, { userName, password, code }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login(
          userName,
          password,
          code
        ).then(res => {
          console.log('loging.....', res)
          if (res.data.errno !== 0) {
            Notice.error({
              // title: res.data.errmsg.length > 0 ? res.data.errmsg : '验证出错,请刷新重试'
              title: '验证出错,请刷新页面重试'
            })
          } else {
            const data = res.data
            let userData = JSON.parse(JSON.stringify(data.data.userData[0]))
            delete (userData['pwd'])
            commit('setUser', userData)
            commit('setToken', data.data.userData[0].token)
            commit('setUserName', data.data.userData[0].userName)
            commit('setSchoolId', data.data.userData[0].schoolid)
            commit('setUserType', data.data.userData[0].usertype)
            commit('setSysUserID', data.data.userData[0].sysUserID)
            let access = ''
            if (data.data.userData[0].usertype === 1) {
              access = 'systemAdministrator'
            } else {
              access = 'schoolAdministrator'
            }
            commit('setAccess', [access])
            commit('setHasGetInfo', true)
            resolve()
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        // commit('setToken', '')
        // commit('setAccess', [])
        // resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        const userString = sessionStorage.getItem('user')
        const user = JSON.parse(userString)
        if (!_.isEmpty(user)) {
          commit('setUserName', user.userName)
          commit('setSchoolId', user.schoolid)
          commit('setUserType', user.usertype)
          commit('setSysUserID', user.sysUserID)
          let access = ''
          if (user.usertype === 1) {
            access = 'systemAdministrator'
          } else {
            access = 'schoolAdministrator'
          }
          commit('setAccess', [access])
          commit('setHasGetInfo', true)
          resolve(user)
        } else {
          getUserInfo(state.user.sysUserID).then(res => {
            const data = res.data.data
            let userData = JSON.parse(JSON.stringify(res.data.data))
            delete (userData['pwd'])
            commit('setUser', userData)
            // commit('setToken', data.token)
            commit('setUserName', data.userName)
            commit('setSchoolId', data.schoolid)
            commit('setUserType', data.usertype)
            commit('setSysUserID', data.sysUserID)
            let access = ''
            if (data.usertype === 1) {
              access = 'systemAdministrator'
            } else {
              access = 'schoolAdministrator'
            }
            commit('setAccess', [access])
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        }
        // try {

        // } catch (error) {
        //   reject(error)
        // }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      // getUnreadCount().then(res => {
      //   const { data } = res
      //   commit('setMessageCount', data)
      // })
    },
    // 获取消息列表，其中包含未读、已读、回收站三个列表
    getMessageList ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getMessage().then(res => {
          const { unread, readed, trash } = res.data
          commit('setMessageUnreadList', unread.sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageReadedList', readed.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          commit('setMessageTrashList', trash.map(_ => {
            _.loading = false
            return _
          }).sort((a, b) => new Date(b.create_time) - new Date(a.create_time)))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据当前点击的消息的id获取内容
    getContentByMsgId ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        let contentItem = state.messageContentStore[msg_id]
        if (contentItem) {
          resolve(contentItem)
        } else {
          getContentByMsgId(msg_id).then(res => {
            const content = res.data
            commit('updateMessageContentStore', { msg_id, content })
            resolve(content)
          })
        }
      })
    },
    // 把一个未读消息标记为已读
    hasRead ({ state, commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        hasRead(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageUnreadList',
            to: 'messageReadedList',
            msg_id
          })
          commit('setMessageCount', state.unreadCount - 1)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除一个已读消息到回收站
    removeReaded ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        removeReaded(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageReadedList',
            to: 'messageTrashList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 还原一个已删除消息到已读消息
    restoreTrash ({ commit }, { msg_id }) {
      return new Promise((resolve, reject) => {
        restoreTrash(msg_id).then(() => {
          commit('moveMsg', {
            from: 'messageTrashList',
            to: 'messageReadedList',
            msg_id
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

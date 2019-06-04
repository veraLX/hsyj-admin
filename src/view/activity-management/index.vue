<template>
  <div>
    <Card>
      <p slot="title">活动列表</p>
        <Table stripe :columns="activityColumns" :data="activityData"></Table>
        <Page show-total :total="count" :current="currentPage" :page-size="pageSize" @on-change="handlePage"/>
    </Card>
    <Modal v-model="editImage"  @on-cancel="childCloseModal" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>图片编辑</span>
      </p>
      <Upload v-if="updateModalShow" :parentId="currentParentId" :sourceType="2" :currentImageArray="currentImageArray"/>
      <div slot="footer">
          <Button type="primary" @click="childCloseModal" >完成</Button>
      </div>
    </Modal>
    <Modal v-model="editActivity"  width="80%" @on-cancel="editActivityModalCancel">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span> 活动编辑</span>
      </p>
      <Activity @editActivityModalCancel="editActivityModalCancel" v-if="updateActivityModalShow" :currentActivity='currentActivity'/>
      <div slot="footer">
          <!-- <Button type="primary" >确认</Button> -->
      </div>
    </Modal>
    <Modal v-model="editAnswer" @on-cancel="answerCloseModal" width="80%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span> 答题编辑</span>
      </p>
      <Answer :isEdit="true" v-if="isAnswer" :objectList="answerAllList" :totalPages='totalAnswerPages' :count='countAnswer' :activityId='activityIdEach' :siteList='siteData'/>
      <div slot="footer">
          <Button type="primary"  @click="answerCloseModal">完成</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { getActivity1List, addActivity, deleteActivity1, finishActivity } from '@/api/activity'
import { getAnswerList } from '@/api/answer'
import { sceneryList } from '@/api/scenery'
import Upload from '@/view/components/uploadImage/index'
import Answer from '@/view/activity-add/answer-management/indexModel'
import Activity from '@/view/activity-management/activity-edit/index'
// editActivity
export default {
  name: 'directive_page',
  components: {
    Answer,
    Upload,
    Activity
  },
  data () {
    return {
      currentParentId: 0,
      editImage: false,
      updateModalShow: false,
      editAnswer: false,
      editActivity: false,
      updateActivityModalShow: false,
      isAnswer: false,
      currentImageArray: [],
      currentActivity: {},
      count: 0,
      pageSize: 5,
      totalPages: 1,
      currentPage: 1,
      currentAnswerPage: 1,
      pageAnswerSize: 5,
      totalAnswerPages: 1,
      countAnswer: 0,
      single: '',
      activityIdEach: null,
      answerAllList: [],
      siteData: [],
      defaultList: [
        {
          'name': 'a42bdcc1178e62b4694c830f028db5c0',
          'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
        },
        {
          'name': 'bc7521e033abdd1e92222d733590f104',
          'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
        }
      ],
      imgName: '',
      visible: false,
      uploadList: [],
      data1: [{ key: '1', label: '复旦大学' },
        { key: '2', label: '上海交通大学' },
        { key: '3 ', label: '杨浦区教育局 ' },
        { key: '4 ', label: '上海财经大学 ' },
        { key: '5 ', label: '同济大学 ' },
        { key: '6 ', label: '杨浦区教育局 ' },
        { key: '7 ', label: '上海财经大学 ' },
        { key: '8 ', label: '同济大学 ' }],
      targetKeys1: ['1', '2'],
      data2: [{ key: '1', label: '三好坞' },
        { key: '2', label: '同济大学' },
        { key: '3 ', label: '财大老门 ' },
        { key: '4 ', label: '同济二食堂 ' }],
      targetKeys2: ['1', '2', '3', '4'],
      activityForm: {
        name: '',
        school: '',
        longitude: '',
        latitude: '',
        description: '',
        audioURL: '',
        videoURL: ''
      },
      activityColumns: [
        { title: ' ', type: 'index', width: 20, align: 'center' },
        { title: '活动名称', key: 'activityName' },
        { title: '主办方', key: 'sponsor' },
        { title: '协办方', key: 'secondSponsor' },
        { title: '主会场', key: 'meetingPlace' },
        { title: '活动模式',
          key: 'isGroup',
          render: (h, params) => {
            let isGroupBoolean = ''
            if (params.row.isGroup) {
              isGroupBoolean = params.row.groupNum + '人团体赛'
            } else {
              isGroupBoolean = '个人赛'
            }
            return h('div', isGroupBoolean)
          }
        },
        { title: '开始日期',
          key: 'startDate',
          render: (h, params) => {
            let startDateString = params.row.startDate
            let startDate = startDateString.split('T')[0]
            return h('div', startDate)
          }
        },
        { title: '结束日期',
          key: 'endDate',
          render: (h, params) => {
            let endDateString = params.row.endDate
            let endDate = endDateString.split('T')[0]
            return h('div', endDate)
          }
        },
        { title: '是否推荐',
          key: 'isrecommend',
          render: (h, params) => {
            let isRecommend = params.row.isrecommend
            if (isRecommend) {
              return h('div', '是')
            } else {
              return h('div', '否')
            }
          }
        },
        // { title: '涉及高校', key: 'shdesc' },
        // { title: '学校数', key: 'shstate', width: 72 },
        // { title: '景点数量', key: 'sceneryCount', width: 84 },
        // { title: '题目数量', key: 'sceneryCount', width: 84 },
        // { title: '通关阈值', key: 'clearanceThreshold', width: 84 },
        // { title: '描述', key: 'describe' },
        {
          title: '操作',
          key: 'action',
          width: 300,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small',
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.openModal(params)
                    }
                  }
                },
                '编辑/查看图片'
              ),
              h('Button', {
                style: { 'margin-right': '8px' },
                props: {
                  type: 'primary',
                  size: 'small',
                  ghost: true,
                  disabled: params.row.isOriginal
                },
                on: {
                  click: () => {
                    this.openAnswerModal(params)
                  }
                }
              }, '答题'),
              h('Button', {
                style: { 'margin-right': '8px' },
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.isOriginal
                },
                on: {
                  click: () => {
                    this.openActivityModal(params)
                  }
                }
              }, '编辑'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': async () => {
                    let deleteActivity = await deleteActivity1(params.row.activityID)
                    if (!deleteActivity.data.errno) {
                      this.$Message.warning('删除成功')
                    }
                    this.flashAllActivityData()
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    disabled: params.row.isOriginal
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      activityData: []
    }
  },
  async mounted () {
    let activityList = await getActivity1List(this.currentPage, this.pageSize)
    this.activityData = activityList.data.data.data
    this.totalPages = activityList.data.data.totalPages
    this.pageSize = activityList.data.data.pageSize
    this.currentPage = activityList.data.data.currentPage
    this.count = activityList.data.data.count
    // this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    editActivityModalCancel () {
      this.editActivity = false
      this.updateActivityModalShow = false
    },
    openActivityModal (params) {
      this.editActivity = true
      this.updateActivityModalShow = true
      this.currentActivity = params.row
    },
    async openAnswerModal (params) {
      let answerList = await getAnswerList(this.currentAnswerPage, this.pageAnswerSize, params.row.activityID)
      this.currentActivity = params.row
      this.answerAllList = answerList.data.data.data
      this.totalAnswerPages = answerList.data.data.totalPages
      this.countAnswer = answerList.data.data.count
      this.activityIdEach = params.row.activityID
      let siteList = await sceneryList()
      this.siteData = siteList.data.data.data
      this.editAnswer = true
      this.isAnswer = true
    },
    async answerCloseModal () {
      this.editAnswer = false
      this.isAnswer = false
      if (this.currentActivity.pics.length > 0) {
        // console.log('currentActivity', this.currentActivity)
        await finishActivity(this.currentActivity.activityID)
        this.$Notice.success({
          title: '该活动编辑完成'
        })
      }
    },
    openModal (params) {
      this.editImage = true
      this.updateModalShow = true
      // this.currentImageArray = params.row.pics
      this.currentParentId = params.row.activityID
    },
    childCloseModal () {
      this.editImage = false
      this.updateModalShow = false
    },
    async flashAllActivityData () {
      let activityList = await getActivity1List(this.currentPage, this.pageSize)
      this.activityData = activityList.data.data.data
      this.totalPages = activityList.data.data.totalPages
      this.pageSize = activityList.data.data.pageSize
      this.currentPage = activityList.data.data.currentPage
      this.count = activityList.data.data.count
    },
    async addActivity () {
      await addActivity(this.activityForm)
    },
    handlePage (value) {
      this.currentPage = value
      this.flashAllActivityData()
    }
    // render1 (item) {
    //   return item.label
    // },
    // handleChange (newTargetKeys, direction, moveKeys) {
    //   console.log(newTargetKeys)
    //   console.log(direction)
    //   console.log(moveKeys)
    //   this.targetKeys1 = newTargetKeys
    // },
    // handleView (name) {
    //   this.imgName = name
    //   this.visible = true
    // },
    // handleRemove (file) {
    //   const fileList = this.$refs.upload.fileList
    //   this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    // },
    // handleSuccess (res, file) {
    //   file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
    //   file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    // },
    // handleFormatError (file) {
    //   this.$Notice.warning({
    //     title: 'The file format is incorrect',
    //     desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
    //   })
    // },
    // handleMaxSize (file) {
    //   this.$Notice.warning({
    //     title: 'Exceeding file size limit',
    //     desc: 'File  ' + file.name + ' is too large, no more than 2M.'
    //   })
    // },
    // handleBeforeUpload () {
    //   const check = this.uploadList.length < 5
    //   if (!check) {
    //     this.$Notice.warning({
    //       title: 'Up to five pictures can be uploaded.'
    //     })
    //   }
    //   return check
    // }
  },
  watch: {
    editImage () {
      if (!this.editImage) {
        this.flashAllActivityData()
      }
    }
  }
}
</script>

<style>
.checkboxForm > .ivu-form-item-content{
    /* margin-left: 0px!important; */
}
.demo-upload-list{
        display: inline-block;
        width: 142px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    .bottomRight{
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
    .imgRow{
      display: flex;
      padding: 0 10px;
      justify-content: space-around;
      align-items: flex-end;
    }
    .imgRow > .ivu-col{
      display: flex;
      align-items: center;
    }
    .fromLabel{
      display: inline-block;
      width: 90px;
      text-align: right;
      padding-right: 12px;
      font-size: 12px;
      color: #515a6e;
      line-height: 1;
    }
</style>

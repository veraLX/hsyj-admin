<template>
  <div>
    <Card>
      <p slot="title">新增活动景点题目</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <FormItem label="景点选择" :style="{'width': '400px'}" prop="sceneryID">
            <Select v-model="formInline.sceneryid" placeholder="输入景点">
              <Option v-for="item in currentSiteList" :value="item.sceneryid" :key="item.sceneryid">{{ item.sceneryname }}</Option>
            </Select>
            <!-- <Input v-model="formInline.sceneryid" placeholder="输入景点"></Input> -->
        </FormItem>
        <!-- <FormItem label="地点" :style="{'width': '400px'}">
            <Input type="textarea" v-model="formInline.startAddress" placeholder="地点"></Input>
        </FormItem> -->
        <FormItem label="题干" :style="{'width': '400px'}" prop="questiontitle">
            <Input type="textarea" v-model="formInline.questiontitle" placeholder="输入题干"></Input>
        </FormItem>
        <FormItem label="选项A" :style="{'width': '400px'}" prop="answera">
            <Input v-model="formInline.answera" placeholder="输入选项A"></Input>
        </FormItem>
        <FormItem label="选项B" :style="{'width': '400px'}" prop="answerb">
            <Input v-model="formInline.answerb" placeholder="输入选项B"></Input>
        </FormItem>
        <FormItem label="选项C" :style="{'width': '400px'}" prop="answerc">
            <Input v-model="formInline.answerc" placeholder="输入选项C"></Input>
        </FormItem>
        <FormItem label="选项D" :style="{'width': '400px'}" prop="answerd">
            <Input v-model="formInline.answerd" placeholder="输入选项D"></Input>
        </FormItem>
        <FormItem label="正确选项" :style="{'width': '400px'}" prop="rightanswer">
            <!-- <Input v-model="formInline.rightanswer" placeholder="正确选项"></Input> -->
            <RadioGroup v-model="formInline.rightanswer">
                <Radio label="A"></Radio>
                <Radio label="B"></Radio>
                <Radio label="C"></Radio>
                <Radio label="D"></Radio>
            </RadioGroup>
        </FormItem>
        <div class="rightButton">
            <Button v-if="!isEdit" type="primary" ghost @click="beforeAnswerStep" style="margin-right: 20px;">上一步</Button>
            <Button type="primary" @click="addAnswer">增加</Button>
        </div>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">答题列表</p>
      <Table stripe :columns="AnswerColumns" :data="AnswerData"></Table>
      <Page show-total :total="totalCount" :current="currentPage" :page-size="pageSize" @on-change="handlePage"/>
      <div class="rightButton">
          <Button v-if="!isEdit" type="primary" @click="finishActivity">完成</Button>
          <!-- <Button type="primary" @click="finishActivity">完成</Button>       -->
      </div>
    </Card>
  </div>
</template>

<script>
import { getAnswerList, addAnswer, deleteAnswer, editAnswer } from '@/api/answer'
import { getActivityBySelf, finishActivity } from '@/api/activity'
export default {
  name: 'directive_page',
  props: {
    objectList: Array,
    // totalPages: Number,
    // totalCount: Number,
    activityId: Number,
    siteList: Array,
    isEdit: Boolean
  },
  data () {
    return {
      pageSize: 5,
      currentPage: 1,
      totalCount: 0,
      formInline: {
        sceneryid: null,
        startAddress: '',
        questiontitle: '',
        answera: '',
        answerb: '',
        answerc: '',
        answerd: '',
        rightanswer: ''
      },
      ruleInline: {
        sceneryID: [
          { required: true, message: '请输入景点', trigger: 'blur' }
        ],
        questiontitle: [
          { required: true, message: '请输入题干', trigger: 'blur' }
        ],
        answera: [
          { required: true, message: '请输入选项A', trigger: 'blur' }
        ],
        answerb: [
          { required: true, message: '请输入选项B', trigger: 'blur' }
        ],
        answerc: [
          { required: true, message: '请输入选项C', trigger: 'blur' }
        ],
        answerd: [
          { required: true, message: '请输入选项D', trigger: 'blur' }
        ],
        rightanswer: [
          { required: true, message: '请选择正确选项', trigger: 'blur' }
        ]
      },
      AnswerColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '景点名称', key: 'sceneryTitle' },
        { title: '题干',
          key: 'questiontitle',
          width: 300,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('textarea', {
                domProps: {
                  value: params.row.questiontitle
                },
                on: {
                  input: function (event) {
                    params.row.questiontitle = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.questiontitle)
            }
          }
        },
        { title: '选项A', key: 'answera' },
        { title: '选项B', key: 'answerb' },
        { title: '选项C', key: 'answerc' },
        { title: '选项D', key: 'answerd' },
        { title: '正确选项', key: 'rightanswer', width: 90 },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            return h('div', [
              h('Button', {
                style: { 'margin-right': '8px' },
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: async () => {
                    if (params.row.$isEdit) {
                      this.$set(params.row, '$isEdit', false)
                      let editReturn = await editAnswer(params.row)
                      if (editReturn.data.errno === 0) {
                        this.$Message.success('活动修改成功')
                      } else {
                        this.$Message.error('活动修改失败')
                      }
                    } else {
                      this.$set(params.row, '$isEdit', true)
                    }
                  }
                }
              }, params.row.$isEdit ? '保存' : '编辑'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': async () => {
                    this.deleteAnswer(params.row)
                  }
                }
              }, [
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      AnswerData: [],
      currentSiteList: []
    }
  },
  created () {
    this.calculateSite()
    this.flashAllAnswerData()
  },
  methods: {
    async finishActivity () {
      let activityDetail = await getActivityBySelf(this.activityId)
      if (activityDetail.data.data.pics.length > 0) {
        await finishActivity(this.activityId)
        this.$Notice.success({
          title: '该活动编辑完成'
        })
      } else {
        if (this.isEdit) {
          this.$Notice.error({
            title: '尚未上传图片，请在活动列表操作栏上传图片'
          })
        } else {
          this.$Notice.error({
            title: '尚未上传图片，请选择上一步增加图片'
          })
        }
      }
    },
    calculateSite () { // 去掉已经在答题列表里面的景点
      this.currentSiteList = JSON.parse(JSON.stringify(this.siteList))
      let arr = this.currentSiteList
      var i = arr.length
      while (i--) {
        _.each(this.AnswerData, (answerItem) => {
          if (arr[i] && answerItem) {
            if (arr[i].sceneryid === answerItem.sceneryid) {
              arr.splice(i, 1)
            }
          }
        })
      }
    },
    async deleteAnswer (rowData) {
      await deleteAnswer(rowData.questionID, rowData.activityid, rowData.sceneryid)
      this.flashAllAnswerData()
    },
    beforeAnswerStep () {
      this.$emit('beforeAnswerStep')
    },
    async addAnswer () {
      if (this.formInline.sceneryid && !_.isEmpty(this.formInline.questiontitle) && !_.isEmpty(this.formInline.answera) &&
       !_.isEmpty(this.formInline.answerb) && !_.isEmpty(this.formInline.answerc) &&
       !_.isEmpty(this.formInline.answerd) && !_.isEmpty(this.formInline.rightanswer)) {
        let answerData = await addAnswer(this.formInline, this.activityId)
        if (answerData.data.errno === 0) {
          this.$Notice.success({
            title: '答题添加成功'
          })
          this.flashAllAnswerData()
          this.formInline = {
            sceneryid: null,
            startAddress: '',
            questiontitle: '',
            answera: '',
            answerb: '',
            answerc: '',
            answerd: '',
            rightanswer: ''
          }
        } else {
          this.$Notice.error({
            title: '答题添加失败'
          })
        }
      } else {
        this.$Notice.error({
          title: '请完善活动景点题目信息'
        })
      }
    },
    async flashAllAnswerData () {
      let answerList = await getAnswerList(this.currentPage, this.pageSize, this.activityId)
      this.AnswerData = answerList.data.data.data
      this.pageSize = answerList.data.data.pageSize
      this.currentPage = answerList.data.data.currentPage
      this.totalCount = answerList.data.data.count
      this.calculateSite()
    },
    handlePage (value) {
      this.currentPage = value
      this.flashAllAnswerData()
    }
  }
}
</script>

<style>
.rightButton{
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
}
</style>

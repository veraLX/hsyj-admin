<template>
  <div>
    <Form ref="formInline" :model="activityForm" inline label-position="right" :label-width="110" :rules="ruleInline">
        <FormItem prop="activityName" label="活动名称" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="activityForm.activityName" placeholder="输入活动名称"></Input>
        </FormItem>
        <FormItem prop="meetingPlace" label="主会场" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="activityForm.meetingPlace" placeholder="输入主会场"></Input>
        </FormItem>
        <FormItem prop="sponsor" label="主办方" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="activityForm.sponsor" placeholder="输入主办方"></Input>
        </FormItem>
        <FormItem prop="secondSponsor" label="协办方" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="activityForm.secondSponsor" placeholder="输入协办方"></Input>
        </FormItem>
        <FormItem prop="startdateAll" label="开始日期" :style="{'width': 'calc((100% - 30px)/3)'}">
            <DatePicker v-model="activityForm.startdateAll" type="datetime" placeholder="输入开始日期" :style="{'width': '100%'}" @on-change="timeCheck"></DatePicker>
        </FormItem>
        <FormItem prop="enddateAll" label="结束日期" :style="{'width': 'calc((100% - 30px)/3)'}">
            <DatePicker v-model="activityForm.enddateAll" type="datetime" placeholder="输入结束日期" :style="{'width': '100%'}" @on-change="timeCheck"></DatePicker>
        </FormItem>
        <FormItem prop="targetKeys1" :required='true' label="学校范围" :style="{'width': '100%'}">
        <Transfer
        :data="data1"
        :target-keys="activityForm.targetKeys1"
        :render-format="render1"
        @on-change="handleChange1"></Transfer>
        </FormItem>
        <FormItem prop="targetKeys2" :required='true' label="景点选择" :style="{'width': '100%'}">
        <Transfer
        :data="data2"
        :target-keys="activityForm.targetKeys2"
        :render-format="render1"
        @on-change="handleChange2"></Transfer>
        </FormItem>
        <FormItem prop="startAddress" label="活动起点" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="activityForm.startAddress" placeholder="输入活动起点"></Input>
          </FormItem>
        <FormItem prop="needSchoolPass" label="通关阈值(学校)" :style="{'width': 'calc((100% - 30px)/3)'}">
          <InputNumber :min="1" v-model="activityForm.needSchoolPass"></InputNumber>
        </FormItem>
        <FormItem prop="needSceneryPass" label="通关阈值(景点)" :style="{'width': 'calc((100% - 30px)/3)'}">
        <InputNumber :min="1" v-model="activityForm.needSceneryPass"></InputNumber>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.settingStartBoolean">是否设定起点</Checkbox>
            <Select v-model="activityForm.startSceneryid" :disabled="!activityForm.settingStartBoolean">
            <Option v-for="item in data2sort" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.settingEndBoolean">是否设定终点</Checkbox>
            <Select v-model="activityForm.endSceneryid" :disabled="!activityForm.settingEndBoolean">
            <Option v-for="item in data2sort" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.isgroupBoolean">是否团队赛</Checkbox>
            <br/>组队人数：<InputNumber :min="2" v-model="activityForm.groupNum" :disabled="!activityForm.isgroupBoolean"></InputNumber>
        </FormItem>
        <FormItem prop="recommend" label="是否推荐" :style="{'width': 'calc((100% - 30px)/3)'}">
            <i-switch v-model="switchRecommend" @on-change="changeRecommend" />
          </FormItem>
        <FormItem prop="shdesc" label="活动描述" :style="{'width': 'calc(100% - 10px)'}">
            <Input type="textarea" v-model="activityForm.shdesc" placeholder="输入描述"></Input>
        </FormItem>
        <FormItem
        style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;"
        >
        <Button type="primary" @click="editComfirm">确定</Button>
        </FormItem>
    </Form>
  </div>
</template>

<script>
import Upload from '@/view/components/uploadImage/index'
import { editActivity } from '@/api/activity'
import { getSchoolList } from '@/api/school'
import { getSceneryFromSchool, getSceneryDetail } from '@/api/scenery'
import moment from 'moment'
// import { constants } from 'crypto'
// import { constants } from 'fs'
export default {
  name: 'directive_page',
  components: {
    // Answer,
    Upload
  },
  props: {
    currentActivity: Object
  },
  data () {
    return {
      switchRecommend: false,
      parentId: 0,
      addActivitySuccess: false,
      single: '',
      schoolList: [],
      siteData: [],
      imgName: '',
      visible: false,
      uploadList: [],
      data1: [],
      // targetKeys1: [],
      data2: [],
      data2sort: [],
      // targetKeys2: [],
      activityForm: {
        needSchoolPass: 1,
        needSceneryPass: 1,
        targetKeys1: [],
        targetKeys2: []
      },
      ruleInline: {
        activityName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        meetingPlace: [
          { required: true, message: '请输入主会场', trigger: 'blur' }
        ],
        sponsor: [
          { required: true, message: '请输入主办方', trigger: 'blur' }
        ],
        secondSponsor: [
          { required: true, message: '请输入协办方', trigger: 'blur' }
        ],
        startdateAll: [
          { required: true, type: 'date', message: '请输入开始日期', trigger: 'change' }
        ],
        enddateAll: [
          { required: true, type: 'date', message: '请输入结束日期', trigger: 'change' }
        ],
        startAddress: [
          { required: true, message: '请输入活动起点', trigger: 'blur' }
        ],
        needSchoolPass: [
          { required: true, message: '请输入通关阈值(学校)', trigger: 'change', type: 'number' }
        ],
        needSceneryPass: [
          { required: true, message: '请输入通关阈值(景点)', trigger: 'change', type: 'number' }
        ]
      }
    }
  },
  mounted () {
    this.getCurrentActivity()
  },
  methods: {
    changeRecommend () {
      if (this.switchRecommend) {
        this.activityForm.isrecommend = 1
      } else {
        this.activityForm.isrecommend = 0
      }
    },
    timeCheck () {
      if (this.activityForm.startdateAll && this.activityForm.enddateAll) {
        if (this.activityForm.startdateAll > this.activityForm.enddateAll) {
          this.$Notice.error({
            title: '开始日期不能大于结束日期'
          })
        }
      }
    },
    async getCurrentActivity () {
      // getSchoolList
      const list = await getSchoolList({ page: 1, pageSize: 100 })
      this.schoolList = list.data.data.data ? list.data.data.data : []
      _.each(this.schoolList, (schoolItem) => {
        this.data1.push({ key: schoolItem.schoolID, label: schoolItem.schoolName })
      })
      // currentActivity
      this.activityForm = this.currentActivity
      // 学校范围
      let needSchoolRang = this.currentActivity.needSchoolRang
      let needSchoolRangArr = needSchoolRang.split(',')
      let targetKeyList = []
      _.each(needSchoolRangArr, (needSchoolId) => {
        _.each(this.schoolList, (schoolItem) => {
          if (schoolItem.schoolID === parseInt(needSchoolId)) {
            targetKeyList.push(schoolItem.schoolID)
          }
        })
      })
      this.$set(this.activityForm, 'targetKeys1', targetKeyList)
      // 景点选择
      let getSceneryFromSchoolList = await getSceneryFromSchool(needSchoolRang)
      this.data2 = []
      this.data2sort = []
      // let data2Arr = []
      _.each((getSceneryFromSchoolList.data.data), schoolSceneryItem => {
        this.data2.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        // data2Arr.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
      })
      let targetKeyList2 = []
      let sceneryList = []
      _.each((this.currentActivity.sceneryRange), async (sceneryItem) => {
        sceneryList.push(sceneryItem.sceneryid)
        // targetKeyList2.push(sceneryItem.sceneryid)
        // let aceneryDetail = await getSceneryDetail(sceneryItem.sceneryid)
        // this.data2sort.push({
        //   key: aceneryDetail.data.data.sceneryID,
        //   label: aceneryDetail.data.data.sceneryTitle
        // })
      })
      sceneryList = this.uniq(sceneryList)
      _.each(sceneryList, async (sceneryIdItem) => {
        targetKeyList2.push(sceneryIdItem)
        let aceneryDetail = await getSceneryDetail(sceneryIdItem)
        this.data2sort.push({
          key: aceneryDetail.data.data.sceneryID,
          label: aceneryDetail.data.data.sceneryTitle
        })
      })
      targetKeyList2 = this.uniq(targetKeyList2)
      this.data2sort = this.uniq(this.data2sort)
      this.$set(this.activityForm, 'targetKeys2', targetKeyList2)
      // 开始时间
      this.$set(this.activityForm, 'startdateAll', new Date(this.currentActivity.startDate))
      // 结束时间
      this.$set(this.activityForm, 'enddateAll', new Date(this.currentActivity.endDate))
      // 是否团体赛
      let isgroupBoolean = false
      if (this.currentActivity.isGroup === 1 && this.currentActivity.groupNum) {
        isgroupBoolean = true
      }
      this.$set(this.activityForm, 'isgroupBoolean', isgroupBoolean)
      // 是否设置起点
      let settingStartBoolean = false
      if (this.currentActivity.settingStart === 1 && this.currentActivity.startSceneryid) {
        settingStartBoolean = true
      }
      this.$set(this.activityForm, 'settingStartBoolean', settingStartBoolean)
      // console.log('settingStartBoolean', settingStartBoolean)
      // console.log('this.currentActivity.startSceneryid', this.currentActivity.startSceneryid)
      // 是否设置终点
      let settingEndBoolean = false
      if (this.currentActivity.settingEnd === 1 && this.currentActivity.endSceneryid) {
        settingEndBoolean = true
      }
      this.$set(this.activityForm, 'settingEndBoolean', settingEndBoolean)
      // 是否推荐
      // let isRecommend = false
      this.switchRecommend = false
      if (this.currentActivity.isrecommend === 1) {
        // isRecommend = true
        this.switchRecommend = true
      }
    },
    async editComfirm () {
      this.$refs['formInline'].validate(async (valid) => {
        if (!this.activityForm.targetKeys1 || !this.activityForm.targetKeys2) {
          this.$Notice.error({
            title: '请填写完整必填字段'
          })
        } else if (this.activityForm.enddateAll < this.activityForm.startdateAll) {
          this.$Notice.error({
            title: '开始日期不能大于结束日期'
          })
        } else if (valid && this.activityForm.targetKeys1.length > 0 && this.activityForm.targetKeys2.length > 0) {
          // 活动名称
          this.$set(this.activityForm, 'activityname', this.activityForm.activityName)
          // 主会场
          this.$set(this.activityForm, 'meetingplace', this.activityForm.meetingPlace)
          // 主办方
          // 协办方
          this.$set(this.activityForm, 'secondsponsor', this.activityForm.secondSponsor)
          // 开始时间
          if (this.activityForm.startdateAll) {
            let startdate = moment(this.activityForm.startdateAll).format('YYYY-MM-DD HH:mm:ss')
            this.$set(this.activityForm, 'startdate', startdate)
          }
          // 结束时间
          if (this.activityForm.enddateAll) {
            let enddate = moment(this.activityForm.enddateAll).format('YYYY-MM-DD HH:mm:ss')
            this.$set(this.activityForm, 'enddate', enddate)
          }
          // 学校范围
          let schoolIdString = ''
          _.each(this.activityForm.targetKeys1, (targetKeys1Id) => {
            schoolIdString = schoolIdString + targetKeys1Id + ','
          })
          schoolIdString = schoolIdString.substring(0, schoolIdString.length - 1)
          this.$set(this.activityForm, 'needschoolrang', schoolIdString)
          // 景点选择
          let sceneryIdString = ''
          this.activityForm.targetKeys2 = this.uniq(this.activityForm.targetKeys2)
          _.each(this.activityForm.targetKeys2, (targetKeys2Id) => {
            sceneryIdString = sceneryIdString + targetKeys2Id + ','
          })
          sceneryIdString = sceneryIdString.substring(0, sceneryIdString.length - 1)
          this.$set(this.activityForm, 'needsceneryrang', sceneryIdString)
          // 活动起点
          this.$set(this.activityForm, 'startaddress', this.activityForm.startAddress)
          // 通关阈值(学校)
          this.$set(this.activityForm, 'needschoolpass', this.activityForm.needSchoolPass)
          // 通关阈值(景点)
          this.$set(this.activityForm, 'needscenerypass', this.activityForm.needSceneryPass)
          // 是否起点
          if (this.activityForm.settingStartBoolean) {
            this.$set(this.activityForm, 'settingstart', 1)
            this.$set(this.activityForm, 'startsceneryid', this.activityForm.startSceneryId)
          } else {
            this.$set(this.activityForm, 'settingstart', 0)
            this.$set(this.activityForm, 'startsceneryid', null)
          }
          // 是否终点
          if (this.activityForm.settingEndBoolean) {
            this.$set(this.activityForm, 'settingend', 1)
            this.$set(this.activityForm, 'endsceneryid', this.activityForm.endSceneryId)
          } else {
            this.$set(this.activityForm, 'settingend', 0)
            this.$set(this.activityForm, 'endsceneryid', null)
          }
          // 是否团体赛
          if (this.activityForm.isgroupBoolean) {
            this.$set(this.activityForm, 'isgroup', 1)
            if (this.activityForm.groupNum) {
              this.$set(this.activityForm, 'groupnum', this.activityForm.groupNum)
            } else {
              this.$Notice.error({
                title: '未设置团队人数，将默认设置为2'
              })
              this.$set(this.activityForm, 'groupnum', 2)
            }
          } else {
            this.$set(this.activityForm, 'isgroup', 0)
            this.$set(this.activityForm, 'groupnum', null)
          }
          // 描述
          let editReturn = await editActivity(this.activityForm, this.activityForm.activityID)
          if (editReturn.data.errno === 0) {
            this.$Notice.success({
              title: '活动修改成功'
            })
            this.$emit('editActivityModalCancel')
          }
        } else {
          this.$Notice.error({
            title: '请填写完整必填字段'
          })
        }
      })
    // }
    //   let editReturn = await addActivity(this.activityForm)
    //   if (editReturn.data.insertid) {
    //     this.addActivitySuccess = true
    //     this.$Notice.success({
    //       title: '活动添加成功'
    //     })
    //     this.parentId = editReturn.data.insertid
    //   }
    },
    render1 (item) {
      return item.label
    },
    uniq (array) {
      var temp = [] // 一个新的临时数组
      for (var i = 0; i < array.length; i++) {
        if (temp.indexOf(array[i]) === -1) {
          temp.push(array[i])
        }
      }
      return temp
    },
    async handleChange1 (newTargetKeys, direction, moveKeys) {
      this.activityForm.targetKeys1 = newTargetKeys
      let schoolIdString = ''
      _.each(this.activityForm.targetKeys1, (schoolId) => {
        schoolIdString = schoolIdString + schoolId + ','
      })
      schoolIdString = schoolIdString.substring(0, schoolIdString.length - 1)
      this.$set(this.activityForm, 'needschoolrang', schoolIdString)
      let getSceneryFromSchoolList = await getSceneryFromSchool(schoolIdString)
      this.data2 = []
      this.data2sort = []
      this.activityForm.targetKeys2 = []
      // let data2Arr = []
      let targetKeys2Arr = []
      _.each((getSceneryFromSchoolList.data.data), schoolSceneryItem => {
        this.data2.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        this.data2sort.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        this.activityForm.targetKeys2.push(schoolSceneryItem.sceneryID)
        // data2Arr.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        targetKeys2Arr.push(schoolSceneryItem.sceneryID)
      })
      targetKeys2Arr = this.uniq(targetKeys2Arr)
      let sceneryIdString = ''
      _.each(targetKeys2Arr, (sceneryId) => {
        sceneryIdString = sceneryIdString + sceneryId + ','
      })
      sceneryIdString = sceneryIdString.substring(0, sceneryIdString.length - 1)
      this.$set(this.activityForm, 'needsceneryrang', sceneryIdString)
    },
    handleChange2 (newTargetKeys, direction, moveKeys) {
      this.uniq(newTargetKeys)
      this.activityForm.targetKeys2 = newTargetKeys
      let sceneryIdString = ''
      this.data2sort = []
      _.each(this.activityForm.targetKeys2, (sceneryId) => {
        sceneryIdString = sceneryIdString + sceneryId + ','
        _.each(this.data2, (data2Item) => {
          if (data2Item.key === sceneryId) {
            this.data2sort.push(data2Item)
          }
        })
      })
      // if (sceneryIdString.length > 0) {
      //   sceneryIdString = sceneryIdString.substr(0, sceneryIdString.length - 1)
      // }
      sceneryIdString = sceneryIdString.substring(0, sceneryIdString.length - 1)
      this.$set(this.activityForm, 'needsceneryrang', sceneryIdString)
    }
  }
}
</script>

<style>
.activitySrep{
    display: flex;
    justify-content: center;
    padding: 20px 0 30px 0;
}
.activitySrep > .ivu-steps-item:first-child,
.activitySrep > .ivu-steps-item:nth-child(2){
    width: 30%!important;
}
.activitySrep > .ivu-steps-item:nth-child(3){
    width: 100px!important;
}
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
    .setImage{
      font-size: 15px;
      text-align: center;
      padding: 2px;
      position: absolute;
      right: 70px;
      width: 100px;
    }
    .rightButton{
        display: flex;
        justify-content: flex-end;
        padding-right: 10px;
    }
</style>

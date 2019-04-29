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
            <DatePicker v-model="activityForm.startdateAll" type="date" placeholder="输入开始日期" :style="{'width': '100%'}" @on-change="timeCheck"></DatePicker>
        </FormItem>
        <FormItem prop="enddateAll" label="结束日期" :style="{'width': 'calc((100% - 30px)/3)'}">
            <DatePicker v-model="activityForm.enddateAll" type="date" placeholder="输入结束日期" :style="{'width': '100%'}" @on-change="timeCheck"></DatePicker>
        </FormItem>
        <FormItem prop="targetKeys1" label="学校范围" :style="{'width': 'calc((100% - 20px)/2)'}">
        <Transfer
        :data="data1"
        :target-keys="activityForm.targetKeys1"
        :render-format="render1"
        @on-change="handleChange1"></Transfer>
        </FormItem>
        <FormItem prop="targetKeys2" label="景点选择" :style="{'width': 'calc((100% - 20px)/2)'}">
        <Transfer
        :data="data2"
        :target-keys="activityForm.targetKeys2"
        :render-format="render1"
        @on-change="handleChange2"></Transfer>
        </FormItem>
        <FormItem prop="needSchoolPass" label="通关阈值(学校)" :style="{'width': 'calc((100% - 20px)/2)'}">
        <InputNumber :min="1" v-model="activityForm.needSchoolPass"></InputNumber>
        </FormItem>

        <FormItem prop="needSceneryPass" label="通关阈值(景点)" :style="{'width': 'calc((100% - 20px)/2)'}">
        <InputNumber :min="1" v-model="activityForm.needSceneryPass"></InputNumber>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.settingStartBoolean">是否设定起点</Checkbox>
            <Select v-model="activityForm.startSceneryid" :disabled="!activityForm.settingStartBoolean">
            <Option v-for="item in data2" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.settingEndBoolean">是否设定终点</Checkbox>
            <Select v-model="activityForm.endSceneryid" :disabled="!activityForm.settingEndBoolean">
            <Option v-for="item in data2" :value="item.key" :key="item.key">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
            <Checkbox v-model="activityForm.isgroupBoolean">是否团队赛</Checkbox>
            <br/>组队人数：<InputNumber :min="1" v-model="activityForm.groupNum" :disabled="!activityForm.isgroupBoolean"></InputNumber>
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
import { getSceneryFromSchool } from '@/api/scenery'
import moment from 'moment'
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
      console.log('this.activityForm', this.activityForm)
      // 学校范围
      // let needSchoolRang = this.currentActivity.needSchoolRang
      // let needSchoolRangArr = needSchoolRang.split(',')
      // let targetKeyList = []
      // _.each(needSchoolRangArr, (needSchoolId) => {
      //   _.each(this.schoolList, (schoolItem) => {
      //     if (schoolItem.schoolID === parseInt(needSchoolId)) {
      //       targetKeyList.push(schoolItem.schoolID)
      //     }
      //   })
      // })
      // 景点选择
      // let needSceneryRang = this.currentActivity.needSceneryRang
      // this.$set(this.activityForm, 'targetKeys1', targetKeyList)
      // 开始时间
      let firststartDate = this.currentActivity.startDate.split(' ')[0]
      let secondstartDate = this.currentActivity.startDate.split(' ')[1]
      let startdateAll = firststartDate + 'T' + secondstartDate
      this.$set(this.activityForm, 'startdateAll', startdateAll)
      console.log('this.activityForm.startdateAll', this.activityForm.startdateAll)
      // 结束时间
      let firendDate = this.currentActivity.endDate.split(' ')[0]
      let secondendDate = this.currentActivity.endDate.split(' ')[1]
      let enddateAll = firendDate + 'T' + secondendDate
      this.$set(this.activityForm, 'enddateAll', enddateAll)
      // 是否团体赛
      let isgroupBoolean = false
      if (this.currentActivity.isGroup === 1) {
        isgroupBoolean = true
      }
      this.$set(this.activityForm, 'isgroupBoolean', isgroupBoolean)
      // 是否设置起点
      let settingStartBoolean = false
      if (this.currentActivity.settingStart === 1) {
        settingStartBoolean = true
      }
      this.$set(this.activityForm, 'settingStartBoolean', settingStartBoolean)
      // 是否设置终点
      let settingEndBoolean = false
      if (this.currentActivity.settingEnd === 1) {
        settingEndBoolean = true
      }
      this.$set(this.activityForm, 'settingEndBoolean', settingEndBoolean)
    //   const list = await getCurrentSchool({ page: 1, pageSize: 100 })
    //   console.log('schoolList', list)
    //   this.schoolList = list.data.data.data ? list.data.data.data : []
    //   _.each(this.schoolList, (schoolItem) => {
    //     this.data1.push({ key: schoolItem.schoolID, label: schoolItem.schoolName })
    //   })
    //   console.log('this.data1', this.data1)
    },
    async editComfirm () {
      this.$refs['formInline'].validate(async (valid) => {
        if (this.activityForm.enddateAll < this.activityForm.startdateAll) {
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
            let startdate = moment(this.activityForm.startdateAll).format('YYYY-MM-DD')
            this.$set(this.activityForm, 'startdate', startdate)
          }
          // 结束时间
          if (this.activityForm.enddateAll) {
            let enddate = moment(this.activityForm.enddateAll).format('YYYY-MM-DD')
            this.$set(this.activityForm, 'enddate', enddate)
          }
          // 学校范围
          // 景点选择
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
            this.$set(this.activityForm, 'groupnum', this.activityForm.groupNum)
          } else {
            this.$set(this.activityForm, 'isgroup', 0)
            this.$set(this.activityForm, 'groupnum', null)
          }
          // 描述
          let editReturn = await editActivity(this.activityForm, this.activityForm.activityID)
          console.log('editReturn', editReturn)
        } else {
          this.$Notice.error({
            title: '请填写完整必填字段'
          })
        }
      })
    // }
    //   console.log('this.activityForm', this.activityForm)
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
    async handleChange1 (newTargetKeys, direction, moveKeys) {
      this.activityForm.targetKeys1 = newTargetKeys
      console.log('this.targetKeys1', this.activityForm.targetKeys1)
      let schoolIdString = ''
      _.each(this.activityForm.targetKeys1, (schoolId) => {
        schoolIdString = schoolIdString + schoolId + ','
      })
      if (schoolIdString.length > 0) {
        schoolIdString = schoolIdString.substr(0, schoolIdString.length - 1)
      }
      this.$set(this.activityForm, 'needschoolrang', schoolIdString)
      let getSceneryFromSchoolList = await getSceneryFromSchool(schoolIdString)
      this.data2 = []
      this.activityForm.targetKeys2 = []
      let data2Arr = []
      let targetKeys2Arr = []
      _.each((getSceneryFromSchoolList.data.data), schoolSceneryItem => {
        this.data2.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        this.activityForm.targetKeys2.push(schoolSceneryItem.sceneryID)
        data2Arr.push({ key: schoolSceneryItem.sceneryID, label: schoolSceneryItem.sceneryTitle })
        targetKeys2Arr.push(schoolSceneryItem.sceneryID)
      })
      console.log('data2Arr', data2Arr)
      console.log('targetKeys2Arr', targetKeys2Arr)
      let sceneryIdString = ''
      _.each(targetKeys2Arr, (sceneryId) => {
        sceneryIdString = sceneryIdString + sceneryId + ','
      })
      if (sceneryIdString.length > 0) {
        sceneryIdString = sceneryIdString.substr(0, sceneryIdString.length - 1)
      }
      this.$set(this.activityForm, 'needsceneryrang', sceneryIdString)
      console.log('this.activityForm.needsceneryrang', this.activityForm.needsceneryrang)
    },
    handleChange2 (newTargetKeys, direction, moveKeys) {
      this.activityForm.targetKeys2 = newTargetKeys
      console.log('this.activityForm.targetKeys2', this.activityForm.targetKeys2)
      let sceneryIdString = ''
      _.each(this.activityForm.targetKeys2, (sceneryId) => {
        sceneryIdString = sceneryIdString + sceneryId + ','
      })
      if (sceneryIdString.length > 0) {
        sceneryIdString = sceneryIdString.substr(0, sceneryIdString.length - 1)
      }
      this.$set(this.activityForm, 'needsceneryrang', sceneryIdString)
      console.log('this.activityForm.needsceneryrang', this.activityForm.needsceneryrang)
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

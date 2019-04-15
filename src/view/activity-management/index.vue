<template>
  <div>
    <Card>
    <Tabs value="new">
        <TabPane label="新增活动" name="new">
          <!-- <Card>
              <p slot="title">新增活动</p> -->
              <Form :model="activityForm" inline label-position="right" :label-width="100">
                <FormItem prop="activityname" label="活动名称" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <Input v-model="activityForm.activityname" placeholder="输入活动名称"></Input>
                </FormItem>
                <FormItem prop="meetingplace" label="主会场" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <Input v-model="activityForm.sponsor" placeholder="输入主会场"></Input>
                </FormItem>
                <FormItem prop="sponsor" label="主办方" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <Input v-model="activityForm.sponsor" placeholder="输入主办方"></Input>
                </FormItem>
                <FormItem prop="secondsponsor" label="协办方" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <Input v-model="activityForm.secondsponsor" placeholder="输入协办方"></Input>
                </FormItem>
                <FormItem prop="startdate" label="开始日期" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <DatePicker v-model="activityForm.startdate" type="date" placeholder="输入开始日期" :style="{'width': '100%'}" ></DatePicker>
                </FormItem>
                <FormItem prop="enddate" label="结束日期" :style="{'width': 'calc((100% - 30px)/3)'}">
                    <DatePicker v-model="activityForm.enddate" type="date" placeholder="输入结束日期" :style="{'width': '100%'}" ></DatePicker>
                </FormItem>
                <FormItem prop="universities" label="学校范围" :style="{'width': 'calc((100% - 20px)/2)'}">
                  <Transfer
                  :data="data1"
                  :target-keys="targetKeys1"
                  :render-format="render1"
                  @on-change="handleChange1"></Transfer>
                </FormItem>
                <FormItem prop="scenic" label="景点选择" :style="{'width': 'calc((100% - 20px)/2)'}">
                  <Transfer
                  :data="data2"
                  :target-keys="targetKeys2"
                  :render-format="render1"
                  @on-change="handleChange1"></Transfer>
                </FormItem>
                <FormItem prop="needschoolpass" label="通关阈值(学校)" :style="{'width': 'calc((100% - 20px)/2)'}">
                  <InputNumber :min="1" v-model="activityForm.needschoolpass"></InputNumber>
                </FormItem>

                <FormItem prop="needscenerypass" label="通关阈值(景点)" :style="{'width': 'calc((100% - 20px)/2)'}">
                  <InputNumber :min="1" v-model="activityForm.needscenerypass"></InputNumber>
                </FormItem>
                <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
                    <Checkbox v-model="activityForm.settingstart">是否设定起点</Checkbox>
                    <Select v-model="activityForm.startsceneryid">
                      <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
                    </Select>
                </FormItem>
                <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
                    <Checkbox v-model="activityForm.settingend">是否设定终点</Checkbox>
                    <Select v-model="activityForm.endsceneryid">
                        <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
                      </Select>
                </FormItem>
                <FormItem :style="{'width': 'calc((100% - 30px)/3)'}" class="checkboxForm">
                    <Checkbox v-model="activityForm.isgroup">是否团队赛</Checkbox>
                    <br/>组队人数：<InputNumber :min="1" v-model="activityForm.groupnum"></InputNumber>
                </FormItem>
                <FormItem prop="shdesc" label="活动描述" :style="{'width': 'calc(100% - 10px)'}">
                    <Input type="textarea" v-model="activityForm.shdesc" placeholder="输入描述"></Input>
                </FormItem>
                <Row class="imgRow">
                  <i-col span="20">
                    <span class="fromLabel">图片预览</span>
                    <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
                      <template v-if="item.status === 'finished'">
                          <img :src="item.url">
                          <div class="demo-upload-list-cover">
                              <Icon size="40px" type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                              <Icon size="40px" type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                          </div>
                      </template>
                      <template v-else>
                          <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                      </template>
                    </div>
                    <iframe src="http://hsyj.100eduonline.com/static/admin/uploadComponent/upload.html" width="100%" height="110" style="border: none;overflow:hidden"/>
                    <!-- <Upload
                      ref="upload"
                      :show-upload-list="false"
                      :default-file-list="defaultList"
                      :on-success="handleSuccess"
                      :format="['jpg','jpeg','png']"
                      :max-size="2048"
                      :on-format-error="handleFormatError"
                      :on-exceeded-size="handleMaxSize"
                      :before-upload="handleBeforeUpload"
                      multiple
                      type="drag"
                      action="//jsonplaceholder.typicode.com/posts/"
                      style="display: inline-block;width:142px;">
                      <div style="width: 142px;height:80px;line-height: 80px;">
                          <Icon type="ios-camera" size="30"></Icon>
                      </div>
                    </Upload> -->
                  </i-col>
                  <i-col span="4">
                    <Button class="bottomRight" type="primary" @click="addActivity">增加</Button>
                  </i-col>
                </Row>
              </Form>
            <!-- </Card> -->
        </TabPane>
        <TabPane label="活动列表" name="list">
          <!-- <Card :style="{'margin-top': '20px'}">
            <p slot="title">活动列表</p> -->
            <Table stripe :columns="activityColumns" :data="activityData"></Table>
            <Page :total="100" />
          <!-- </Card> -->
        </TabPane>
    </Tabs>
    </Card>
  </div>
</template>

<script>
import { getActivity1List, addActivity } from '@/api/activity'
// editActivity
export default {
  name: 'directive_page',
  data () {
    return {
      single: '',
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
        { title: '活动名称', key: 'name' },
        { title: '主办方', key: 'sponsor' },
        { title: '协办方', key: 'coSponsor' },
        { title: '主会场', key: 'mainVenue' },
        { title: '活动模式', key: 'activityMode' },
        { title: '开始日期', key: 'startDate' },
        { title: '结束日期', key: 'endDate' },
        { title: '涉及高校', key: 'universities' },
        { title: '学校数', key: 'universitiesNumber', width: 72 },
        { title: '景点数量', key: 'scenicNumber', width: 84 },
        { title: '题目数量', key: 'questionsNumber', width: 84 },
        { title: '通关阈值', key: 'clearanceThreshold', width: 84 },
        { title: '描述', key: 'describe' },
        { title: '图片预览' },
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
                  size: 'small',
                  disabled: params.row.isOriginal
                },
                on: {
                  click: () => {
                    console.log(params)
                  }
                }
              }, '修改'),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': async () => {
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
      activityData: [
        {
          name: '财大一日游',
          sponsor: '上海财经大学',
          coSponsor: '复旦大学',
          mainVenue: '财大本校',
          activityMode: '团体赛',
          startDate: '2019-05-01 10:00',
          endDate: '2019-05-01',
          universities: '上海财经大学、复旦大学、同济大学',
          universitiesNumber: 3,
          scenicNumber: 24,
          questionsNumber: 11,
          clearanceThreshold: '3+18',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。'
        },
        {
          name: '财大一日游',
          sponsor: '上海财经大学',
          coSponsor: '复旦大学',
          mainVenue: '财大本校',
          activityMode: '个人',
          startDate: '2019-05-01 10:00',
          endDate: '2019-05-01',
          universities: '上海财经大学、复旦大学、同济大学',
          universitiesNumber: 3,
          scenicNumber: 24,
          questionsNumber: 11,
          clearanceThreshold: '3+18',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。'
        }
      ],
      currentPage: 1

    }
  },
  async mounted () {
    let activityList = await getActivity1List(this.currentPage, 5)
    console.log('activityList', activityList)
    // this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    async addActivity () {
      let addActivityItem = await addActivity(this.activityForm)
      console.log('addActivityItem', addActivityItem)
    },
    render1 (item) {
      return item.label
    },
    handleChange1 (newTargetKeys, direction, moveKeys) {
      console.log(newTargetKeys)
      console.log(direction)
      console.log(moveKeys)
      this.targetKeys1 = newTargetKeys
    },
    handleView (name) {
      this.imgName = name
      this.visible = true
    },
    handleRemove (file) {
      const fileList = this.$refs.upload.fileList
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1)
    },
    handleSuccess (res, file) {
      file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar'
      file.name = '7eb99afb9d5f317c912f08b5212fd69a'
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: 'The file format is incorrect',
        desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: 'Exceeding file size limit',
        desc: 'File  ' + file.name + ' is too large, no more than 2M.'
      })
    },
    handleBeforeUpload () {
      const check = this.uploadList.length < 5
      if (!check) {
        this.$Notice.warning({
          title: 'Up to five pictures can be uploaded.'
        })
      }
      return check
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

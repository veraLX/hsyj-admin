<template>
  <div>
    <Card>
    <Tabs value="new">
        <TabPane label="新增活动" name="new">
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
                <FormItem
                  style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;"
                >
                  <Button type="primary" >下一步</Button>
                  <a @click="openImageDialog" type="text" class="setImage">设置图片</a>
                </FormItem>
                <!-- <Row class="imgRow">
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
                    <iframe src="http://hsyj.100eduonline.com/static/images/admin/uploadComponent/upload.html" height="120" width="100%" style="border: none;overflow:hidden"/>
                  </i-col>
                  <i-col span="4">
                    <Button class="bottomRight" type="primary" >下一步</Button>
                  </i-col>
                </Row> -->
                <!-- <Button class="bottomRight" type="primary" @click="addSchool">下一步</Button> -->
              </Form>
        </TabPane>
        <TabPane label="新建答题" name="list">
          <Answer/>
          </TabPane>
        </Tabs>
    </Card>
    <Modal v-model="editImage" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>图片编辑</span>
      </p>
      <Upload/>
      <div slot="footer"> </div>
    </Modal>
  </div>
</template>

<script>
import Answer from '@/view/activity-add/answer-management/index'
import Upload from '@/view/components/uploadImage/index'
export default {
  name: 'directive_page',
  components: {
    Answer,
    Upload
  },
  data () {
    return {
      single: '',
      editImage: false,
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
      }
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
    openImageDialog () {
      this.editImage = true
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
    .setImage{
      font-size: 15px;
      text-align: center;
      padding: 2px;
      position: absolute;
      right: 70px;
      width: 100px;
    }
</style>

<template>
  <div>
    <Card>
      <p slot="title">新增景点</p>
      <Form :model="siteForm" :rules="ruleInline" inline label-position="right" :label-width="90">
        <FormItem prop="name" label="景点名称" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.name" placeholder="输入景点名称"></Input>
        </FormItem>
         <FormItem prop="school" label="校区" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Select v-model="siteForm.school">
              <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
            </Select>
        </FormItem>
        <FormItem prop="audioURL" label="音频URL地址" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.audioURL" placeholder="输入音频URL地址"></Input>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.longitude" placeholder="输入经度"></Input>
        </FormItem>
        <FormItem prop="latitude" label="纬度" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.latitude" placeholder="输入纬度"></Input>
        </FormItem>
        <FormItem prop="videoURL" label="视频URL地址" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.videoURL" placeholder="输入视频URL地址"></Input>
        </FormItem>
        <FormItem prop="description" label="描述" :style="{'width': 'calc(100% - 10px)'}">
            <Input type="textarea" v-model="siteForm.description" placeholder="输入描述"></Input>
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
            <Upload
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
            </Upload>
          </i-col>
          <i-col span="4">
            <Button class="bottomRight" type="primary" >增加</Button>
          </i-col>
        </Row>
        <Modal title="View Image" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">景点列表</p>
      <Table stripe :columns="siteColumns" :data="siteData"></Table>
      <Page :total="100" />
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      siteForm: {
        name: '',
        school: '',
        longitude: '',
        latitude: '',
        description: '',
        audioURL: '',
        videoURL: ''
      },
      ruleInline: {
        password: [
          { required: true, message: '请输入景点名称', trigger: 'blur' }
        ]
      },
      siteColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '景点名称', key: 'name' },
        { title: '地点', key: 'location' },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        { title: '描述', key: 'description', width: '200px' },
        { title: '图片预览' },
        { title: '音频URL地址', key: 'audioURL', width: '110px' },
        { title: '视频URL地址', key: 'videoURL', width: '110px' },
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
      siteData: [
        {
          name: '三好坞',
          location: '同济大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          audioURL: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videoURL: 'http://www.333ttt.com/up/?u=&page=2&id='
        },
        {
          name: '三好坞',
          location: '同济大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          audioURL: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videoURL: 'http://www.333ttt.com/up/?u=&page=2&id='
        }
      ],
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
      uploadList: []
    }
  },
  mounted () {
    this.uploadList = this.$refs.upload.fileList
  },
  methods: {
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
      width: 80px;
      text-align: right;
      padding-right: 12px;
      font-size: 12px;
      color: #515a6e;
      line-height: 1;
    }
</style>

<template>
  <div>
    <Card>
      <p slot="title">新增景点</p>
      <span slot="extra" :style="{ 'cursor':'pointer'}" @click="getPoint">经纬度查询 ></span>
      <Form ref="formInline" :model="siteForm" :rules="ruleInline" inline label-position="right" :label-width="90">
        <FormItem prop="scenerytitle" label="景点名称" :style="{'width': 'calc((100% - 40px)/4)'}">
            <Input v-model="siteForm.scenerytitle" placeholder="输入景点名称"></Input>
        </FormItem>
         <FormItem prop="address" label="校区" :style="{'width': 'calc((100% - 40px)/4)'}">
            <!-- <Input v-model="siteForm.address" placeholder="输入景点名称"></Input> -->
            <Select v-model="siteForm.schoolid" :label-in-value="true" filterable @on-change="handleChange">
                <Option v-for="item in schoolList" :value="item.schoolID" :label="item.schoolName" :key="item.schoolID">{{ item.schoolName }}</Option>
            </Select>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 40px)/4)'}">
            <Input v-model="siteForm.longitude" placeholder="输入经度"></Input>
        </FormItem>
        <FormItem prop="latitude" label="纬度" :style="{'width': 'calc((100% - 40px)/4)'}">
            <Input v-model="siteForm.latitude" placeholder="输入纬度"></Input>
        </FormItem>
        <!-- <FormItem prop="videoURL" label="视频URL地址" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.videourl" placeholder="输入视频URL地址"></Input>
        </FormItem>
        <FormItem prop="soundurl" label="音频URL地址" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="siteForm.soundurl" placeholder="输入音频URL地址"></Input>
        </FormItem> -->
        <FormItem prop="recommend" label="是否推荐" :style="{'width': 'calc((100% - 30px)/3)'}">
            <i-switch v-model="switchRecommend" @on-change="changeRecommend" />
        </FormItem>
        <FormItem prop="shdesc" label="描述" :style="{'width': 'calc(100% - 10px)'}">
            <Input type="textarea" v-model="siteForm.shdesc" placeholder="输入描述"></Input>
        </FormItem>
        <!-- <Row class="imgRow">
          <i-col span="20"> -->
        <FormItem
            style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;"
          >
            <Button type="primary" @click="addSite">增加</Button>
        </FormItem>
          <!-- </i-col>
        </Row> -->
        <Modal title="View Image" v-model="visible">
          <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
        </Modal>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">景点列表</p>
      <Table stripe :columns="siteColumns" :data="siteData"></Table>
      <Page show-total :total="count" :current="currentPage" :page-size="pageSize" @on-change="handlePage"/>
    </Card>
    <Modal v-model="editSiteImage"  @on-cancel="siteCloseModal" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>图片编辑</span>
      </p>
      <Upload v-if="siteModalShow" :parentId="currentParentId" :sourceType="1"/>
      <div slot="footer">
          <Button type="primary" @click="siteCloseModal" >完成</Button>
      </div>
    </Modal>
    <Modal v-model="editAudio"  @on-cancel="audioCloseModal" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>音频上传</span>
      </p>
      <AudioUpload v-if="audioModalShow" :isAudio="true" :parentId="currentParentId" :sourceType="4" />
      <div slot="footer">
          <Button type="primary" @click="audioCloseModal" >完成</Button>
      </div>
    </Modal>
    <Modal v-model="editVedio"  @on-cancel="vedioCloseModal" width="60%">
      <p slot="header">
        <Icon type="ios-paper-outline"></Icon>
        <span>视频上传</span>
      </p>
      <AudioUpload v-if="vedioModalShow" :isAudio="false" :parentId="currentParentId" :sourceType="5"/>
      <div slot="footer">
          <Button type="primary" @click="vedioCloseModal" >完成</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { addScenery, sceneryList, sceneryDelete, editScenery } from '@/api/scenery'
import Upload from '@/view/components/uploadImage/index'
import AudioUpload from '@/view/components/uploadAudio/index'
import { getSchoolList } from '@/api/school'
import { constants } from 'crypto'
export default {
  name: 'directive_page',
  components: {
    Upload,
    AudioUpload
  },
  data () {
    return {
      // currentSite: {},
      // currentSiteId: null,
      editAudio: false,
      editVedio: false,
      audioModalShow: false,
      vedioModalShow: false,
      currentParentId: 0,
      editSiteImage: false,
      siteModalShow: false,
      count: 0,
      pageSize: 5,
      totalPages: 1,
      currentPage: 1,
      switchRecommend: false,
      siteForm: {
        scenerytitle: '',
        address: '',
        longitude: '',
        latitude: '',
        shdesc: '',
        soundurl: '',
        videourl: '',
        isrecommend: 0
      },
      ruleInline: {
        scenerytitle: [
          { required: true, message: '请输入景点名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入校区', trigger: 'change' }
        ],
        longitude: [
          { required: true, message: '请输入经度', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '请输入纬度', trigger: 'blur' }
        ],
        shdesc: [
          { required: true, message: '请输入描述', trigger: 'blur' }
        ]
      },
      siteColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '景点名称',
          key: 'sceneryTitle',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.sceneryTitle
                },
                on: {
                  input: function (event) {
                    params.row.sceneryTitle = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.sceneryTitle)
            }
          }
        },
        { title: '地点',
          key: 'address',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.address
                },
                on: {
                  input: function (event) {
                    params.row.address = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.address)
            }
          }
        },
        { title: '经度',
          key: 'longitude',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.longitude
                },
                on: {
                  input: function (event) {
                    params.row.longitude = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.longitude)
            }
          } },
        { title: '纬度',
          key: 'latitude',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.latitude
                },
                on: {
                  input: function (event) {
                    params.row.latitude = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.latitude)
            }
          } },
        { title: '描述',
          key: 'shdesc',
          width: '200px',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.shdesc
                },
                on: {
                  input: function (event) {
                    params.row.shdesc = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.shdesc)
            }
          } },
        { title: '音频URL地址',
          key: 'soundurl',
          width: '110px',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.soundurl
                },
                on: {
                  input: function (event) {
                    params.row.soundurl = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.soundurl)
            }
          } },
        { title: '视频URL地址',
          key: 'videourl',
          width: '110px',
          render: (h, params) => {
            if (params.row.$isSiteEdit) {
              return h('input', {
                domProps: {
                  value: params.row.videourl
                },
                on: {
                  input: function (event) {
                    params.row.videourl = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.videourl)
            }
          } },
        {
          title: '是否推荐',
          key: 'isrecommend',
          width: 140,
          align: 'center',
          // options: ['delete'],
          render: (h, params) => {
            return h('div', [
              h('i-switch', {
                // style: { 'margin-right': '8px' },
                props: {
                  value: params.row.isrecommend === 1,
                  size: 'small'
                },
                on: {
                  'on-change': async () => {
                    let obj = {
                      sceneryID: params.row.sceneryID,
                      isrecommend: params.row.isrecommend === 0 ? 1 : 0
                    }
                    await editScenery(obj)
                    this.flashAllSiteData()
                  }
                }
              })
            ])
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 268,
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
                      // this.currentSite = params.row
                      // this.currentSiteId = params.row.sceneryID
                      this.openAudioModal(params)
                    }
                  }
                },
                '音频'
              ),
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
                      // this.currentSite = params.row
                      // this.currentSiteId = params.row.sceneryID
                      this.openVedioModal(params)
                    }
                  }
                },
                '视频'
              ),
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
                '图片'
              ),
              h(
                'Button',
                {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.isOriginal
                  },
                  on: {
                    click: async () => {
                      if (params.row.$isSiteEdit) {
                        this.$set(params.row, '$isSiteEdit', false)
                        let obj = {
                          scenerytitle: params.row.scenerytitle,
                          address: params.row.address,
                          shdesc: params.row.shdesc,
                          sourceaddress: params.row.sourceaddress,
                          longitude: params.row.longitude,
                          latitude: params.row.latitude,
                          soundurl: params.row.soundurl,
                          videourl: params.row.videourl,
                          sceneryID: params.row.sceneryID
                        }
                        await editScenery(obj)
                        this.flashAllSiteData()
                      } else {
                        this.$set(params.row, '$isSiteEdit', true)
                      }
                    }
                  }
                },
                params.row.$isSiteEdit ? '保存' : '编辑'
              ),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': async () => {
                    this.deleteSite(params.row)
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
          scenerytitle: '三好坞',
          address: '同济大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          shdesc: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          soundurl: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videourl: 'http://www.333ttt.com/up/?u=&page=2&id='
        },
        {
          scenerytitle: '樱花弄',
          address: '复旦大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          shdesc: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          soundurl: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videourl: 'http://www.333ttt.com/up/?u=&page=2&id='
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
      uploadList: [],
      schoolList: []
    }
  },
  async mounted () {
    this.getSchoolList()
    // this.uploadList = this.$refs.upload.fileList
    let scene = await sceneryList(this.currentPage, this.pageSize)
    this.siteData = scene.data.data.data
    this.totalPages = scene.data.data.totalPages
    this.pageSize = scene.data.data.pageSize
    this.currentPage = scene.data.data.currentPage
    this.count = scene.data.data.count
  },
  methods: {
    changeRecommend () {
      if (this.switchRecommend) {
        this.siteForm.isrecommend = 1
      } else {
        this.siteForm.isrecommend = 0
      }
    },
    handleChange (value) {
      // console.log('value', value)
      // console.log('siteForm.schoolid', this.siteForm.schoolid)
      this.$set(this.siteForm, 'schoolid', value.value)
      this.$set(this.siteForm, 'address', value.label)
    },
    getPoint () {
      window.open('https://lbs.qq.com/tool/getpoint/')
    },
    async getSchoolList () {
      const list = await getSchoolList({ page: 1, pageSize: 100 })
      this.schoolList = list.data.data.data ? list.data.data.data : []
    },
    openAudioModal (params) {
      this.editAudio = true
      this.audioModalShow = true
      this.currentParentId = params.row.sceneryID
    },
    audioCloseModal () {
      this.editAudio = false
      this.audioModalShow = false
      this.flashAllSiteData()
    },
    openVedioModal (params) {
      this.editVedio = true
      this.vedioModalShow = true
      this.currentParentId = params.row.sceneryID
    },
    vedioCloseModal () {
      this.editVedio = false
      this.vedioModalShow = false
      this.flashAllSiteData()
    },
    openModal (params) {
      this.editSiteImage = true
      this.siteModalShow = true
      this.currentParentId = params.row.sceneryID
    },
    siteCloseModal () {
      this.editSiteImage = false
      this.siteModalShow = false
    },
    async flashAllSiteData () {
      let scene = await sceneryList(this.currentPage, this.pageSize)
      this.siteData = scene.data.data.data
      this.totalPages = scene.data.data.totalPages
      this.pageSize = scene.data.data.pageSize
      this.currentPage = scene.data.data.currentPage
      this.count = scene.data.data.count
      // this.currentSite = await getSceneryDetail(this.currentSiteId)
    },
    async addSite () {
      this.$refs['formInline'].validate(async (valid) => {
        if (valid) {
          this.$Message.success('Success!')
          await addScenery(this.siteForm)
          this.flashAllSiteData()
          this.siteForm = {}
          this.switchRecommend = false
        } else {
          this.$Message.error('Fail!')
        }
      })
      // if (!_.isEmpty(this.siteForm.scenerytitle)) {
      //   await addScenery(this.siteForm)
      //   this.flashAllSiteData()
      //   this.siteForm = {}
      //   // console.log('addSite', data)
      // }
    },
    // async editSite () {
    //   let data = await editScenery(this.siteForm)
    //   this.flashAllSiteData()
    //   console.log('addSite', data)
    // },
    async deleteSite (rowData) {
      await sceneryDelete(rowData.sceneryID)
      this.flashAllSiteData()
      // console.log('deleteSite', rowData)
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
    // handleBeforeUpload () {
    //   const check = this.uploadList.length < 5
    //   if (!check) {
    //     this.$Notice.warning({
    //       title: 'Up to five pictures can be uploaded.'
    //     })
    //   }
    //   return check
    // },
    handlePage (value) {
      this.currentPage = value
      this.flashAllSiteData()
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
      padding: 30px 0px;
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

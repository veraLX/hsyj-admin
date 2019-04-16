<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <span slot="extra" @click="getPoint">
        经纬度查询 >
      </span>
      <Form ref="formInline" :model="schoolForm" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="schoolname" label="校区名称" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.schoolname" placeholder="输入校区名称"/>
        </FormItem>
        <FormItem prop="city" label="所属区县" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Select v-model="schoolForm.city">
            <Option v-for="(item,index) in areaList"  :value="item.areaid" :key="'search-col-'+index">{{ item.areaname }}</Option>
          </Select>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.longitude" placeholder="输入经度"/>
        </FormItem>
        <FormItem prop="address" label="地址" :style="{'width': 'calc((100% - 30px)/3*2 + 10px)'}">
          <Input v-model="schoolForm.address" placeholder="输入地址"/>
        </FormItem>
        <FormItem prop="latitude" label="纬度" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.latitude" placeholder="输入纬度"/>
        </FormItem>
        <FormItem prop="schooldesc" label="描述" :style="{'width': 'calc(100% - 10px)'}">
          <Input type="textarea" v-model="schoolForm.schooldesc" placeholder="输入描述"/>
        </FormItem>
        <FormItem prop="image" label="图片预览" style="width:100%;">
          <Row class="imgRow">
            <i-col span="20">
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
              <iframe
                src="http://hsyj.100eduonline.com/static/admin/uploadComponent/upload.html"
                height="auto"
                style="border: none;"
              />
            </i-col>
          </Row>
        </FormItem>
        <FormItem
          style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;"
        >
          <Button class="bottomRight" type="primary" @click="addSchool">增加</Button>
        </FormItem>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">校区列表</p>
      <Table stripe :columns="schoolColumns" :data="schoolList"></Table>
      <Page :total="count" @on-change="changePage"/>
    </Card>
  </div>
</template>

<script>
import {
  addSchool,
  getSchoolList,
  deleteSchool,
  editSchool,
  getArea
} from '@/api/school'
export default {
  name: 'directive_page',
  data () {
    return {
      schoolForm: {
        schoolname: '',
        city: '',
        address: '',
        longitude: '',
        latitude: '',
        schooldesc: ''
      },
      uploadList: [],
      areaList: [],
      count: 0,
      ruleInline: {
        // password: [
        //   { required: true, message: '请输入景点名称', trigger: 'blur' }
        // ]
      },
      schoolColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        {
          title: '校区名称',
          key: 'schoolName',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.schoolName
                },
                on: {
                  input: function (event) {
                    params.row.schoolName = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.schoolName)
            }
          }
        },
        {
          title: '所属区县',
          key: 'city',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('Select', {
                domProps: {
                  value: params.row.city
                },
                on: {
                  'on-change': function (event) {
                    console.log('event', event)
                    params.row.city = event
                  }
                }
              }, this.areaList.map((item) => {
                return h('Option', {
                  props: {
                    value: item.areaid,
                    label: item.areaname
                  }
                })
              }))
            } else {
              return h('div', this.getAreaName(params.row.city))
            }
          }
        },
        {
          title: '经度',
          key: 'longitude',
          render: (h, params) => {
            if (params.row.$isEdit) {
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
          }
        },
        {
          title: '纬度',
          key: 'latitude',
          render: (h, params) => {
            if (params.row.$isEdit) {
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
          }
        },
        {
          title: '地址',
          key: 'address',
          render: (h, params) => {
            if (params.row.$isEdit) {
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
        {
          title: '描述',
          key: 'schooldesc',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('textarea', {
                domProps: {
                  value: params.row.schooldesc
                },
                on: {
                  input: function (event) {
                    params.row.schooldesc = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.schooldesc)
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            return h('div', [
              // h('Button', {
              //   style: { 'margin-right': '8px' },
              //   props: {
              //     type: 'primary',
              //     size: 'small',
              //     disabled: params.row.isOriginal
              //   },
              //   on: {
              //     click: () => {
              //       console.log(params)
              //     }
              //   }
              // }, '修改'),
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
                      if (params.row.$isEdit) {
                        this.$set(params.row, '$isEdit', false)
                        let obj = {
                          schoolname: params.row.schoolName,
                          city: params.row.city,
                          address: params.row.address,
                          longitude: params.row.longitude,
                          latitude: params.row.latitude,
                          schooldesc: params.row.schooldesc,
                          schoolID: params.row.schoolID
                        }
                        if (obj.schoolname === '') {
                          this.$Message.info('学校名称不能为空')
                        } else if (obj.city === '') {
                          this.$Message.info('所属区县不能为空')
                        } else if (obj.address === '') {
                          this.$Message.info('地址不能为空')
                        } else if (obj.longitude === '') {
                          this.$Message.info('经度不能为空')
                        } else if (obj.latitude === '') {
                          this.$Message.info('纬度不能为空')
                        } else {
                          await editSchool(obj)
                          this.getSchoolList()
                        }
                      } else {
                        this.$set(params.row, '$isEdit', true)
                      }
                    }
                  }
                },
                params.row.$isEdit ? '保存' : '编辑'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要删除吗?'
                  },
                  on: {
                    'on-ok': async () => {
                      await deleteSchool(params.row.schoolID)
                      this.getSchoolList()
                    }
                  }
                },
                [
                  h(
                    'Button',
                    {
                      props: {
                        type: 'error',
                        size: 'small',
                        disabled: params.row.isOriginal
                      }
                    },
                    '删除'
                  )
                ]
              )
            ])
          }
        }
      ],
      schoolList: []
    }
  },
  mounted () {
    this.getSchoolList()
    this.getArea()
  },
  methods: {
    async getSchoolList () {
      console.log('123')
      const list = await getSchoolList({ page: 1, pageSize: 10 })
      this.schoolList = list.data.data.data ? list.data.data.data : []
      this.count = list.data.data.count ? list.data.data.count : 0
      console.log(list)
    },
    async getArea () {
      console.log('6663')
      const list = await getArea()
      this.areaList = list.data.data ? list.data.data : []
      console.log(this.areaList)
    },
    async addSchool () {
      debugger
      if (this.schoolForm.schoolname === '') {
        this.$Message.info('学校名称不能为空')
      } else if (this.schoolForm.city === '') {
        this.$Message.info('所属区县不能为空')
      } else if (this.schoolForm.address === '') {
        this.$Message.info('地址不能为空')
      } else if (this.schoolForm.longitude === '') {
        this.$Message.info('经度不能为空')
      } else if (this.schoolForm.latitude === '') {
        this.$Message.info('纬度不能为空')
      } else {
        await addSchool(this.schoolForm)
        this.getSchoolList()
      }
    },
    async changePage (e) {
      debugger
      console.log('123', e)
      const list = await getSchoolList({ page: e })
      this.schoolList = list.data.data.data ? list.data.data.data : []
      console.log(this.schoolList)
    },
    getPoint () {
      window.open('https://lbs.qq.com/tool/getpoint/')
    },
    getAreaName (id) {
      debugger
      // distype：留言类型0,景点; 1,活动,2 学校,3首页
      switch (parseInt(id)) {
        case 1:
          return '黄浦区'
        case 2:
          return '虹口区'
        case 3:
          return '杨浦区'
        case 4:
          return '闸北区'
        case 5:
          return '普陀区'
        case 6:
          return '长宁区'
        case 7:
          return '奉贤区'
        case 8:
          return '金山区'
        case 9:
          return '松江区'
        case 10:
          return '青浦区'
        case 11:
          return '嘉定区'
        case 12:
          return '宝山区'
        case 13:
          return '崇明县'
        case 14:
          return '静安区'
        case 15:
          return '徐汇区'
        case 16:
          return '浦东新区'
      }
    }
  }
}
</script>

<style>
.bottomRight {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>

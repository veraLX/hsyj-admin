<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="schoolForm" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="schoolname" label="校区名称" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.schoolname" placeholder="输入校区名称"/>
        </FormItem>
        <FormItem prop="city" label="所属区县" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Select v-model="schoolForm.city">
            <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
          </Select>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Input v-model="schoolForm.longitude" placeholder="输入经度"/>
        </FormItem>
        <FormItem prop="location" label="地址" :style="{'width': 'calc((100% - 30px)/3*2 + 10px)'}">
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
      <Page :total="100"/>
    </Card>
  </div>
</template>

<script>
import {
  addSchool,
  getSchoolList,
  deleteSchool,
  editSchool
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
              return h('input', {
                domProps: {
                  value: params.row.city
                },
                on: {
                  input: function (event) {
                    params.row.city = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.city)
            }
          }
        },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        { title: '地址', key: 'location' },
        { title: '描述', key: 'schooldesc' },
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
                        debugger
                        let obj = {
                          schoolname: params.row.schoolName,
                          city: params.row.city,
                          address: params.row.address,
                          longitude: params.row.longitude,
                          latitude: params.row.latitude,
                          schooldesc: params.row.schooldesc,
                          schoolID: params.row.schoolID
                        }
                        await editSchool(obj)
                        this.getSchoolList()
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
  },
  methods: {
    async getSchoolList () {
      console.log('123')
      const list = await getSchoolList()
      this.schoolList = list.data.data.data ? list.data.data.data : []
      console.log(this.schoolList)
    },
    async addSchool () {
      debugger
      await addSchool(this.schoolForm)
      this.getSchoolList()
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

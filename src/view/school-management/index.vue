<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="schoolForm" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="name" label="校区名称" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="schoolForm.name" placeholder="输入校区名称"></Input>
        </FormItem>
        <FormItem prop="area" label="所属区县" :style="{'width': 'calc((100% - 30px)/3)'}">
          <Select v-model="schoolForm.area">
            <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
          </Select>
        </FormItem>
        <FormItem prop="longitude" label="经度" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="schoolForm.longitude" placeholder="输入经度"></Input>
        </FormItem>
        <FormItem prop="location" label="地址" :style="{'width': 'calc((100% - 30px)/3*2 + 10px)'}">
            <Input v-model="schoolForm.location" placeholder="输入地址"></Input>
        </FormItem>
        <FormItem prop="latitude" label="纬度" :style="{'width': 'calc((100% - 30px)/3)'}">
            <Input v-model="schoolForm.latitude" placeholder="输入纬度"></Input>
        </FormItem>
        <FormItem prop="description" label="描述" :style="{'width': 'calc(100% - 10px)'}">
            <Input type="textarea" v-model="schoolForm.description" placeholder="输入描述"></Input>
        </FormItem>
        <FormItem prop="image" label="图片预览" style="width:100%;">
        </FormItem>
        <FormItem style="width:100%;display: flex;justify-content: flex-end;padding-right: 10px;margin-bottom: 0;">
            <Button class="bottomRight" type="primary" >增加</Button>
        </FormItem>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">校区列表</p>
      <Table stripe :columns="schoolColumns" :data="schoolData"></Table>
      <Page :total="100" />
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      schoolForm: {
        name: '',
        area: '',
        location: '',
        longitude: '',
        latitude: '',
        description: ''
      },
      ruleInline: {
        // password: [
        //   { required: true, message: '请输入景点名称', trigger: 'blur' }
        // ]
      },
      schoolColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '校区名称',
          key: 'name',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.name
                },
                on: {
                  input: function (event) {
                    params.row.name = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.name)
            }
          }
        },
        { title: '所属区县',
          key: 'area',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.area
                },
                on: {
                  input: function (event) {
                    params.row.area = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.area)
            }
          }
        },
        { title: '经度',
          key: 'longitude' },
        { title: '纬度',
          key: 'latitude' },
        { title: '地址',
          key: 'location' },
        { title: '描述',
          key: 'description' },
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
              h('Button', {
                style: { 'margin-right': '8px' },
                props: {
                  type: 'primary',
                  size: 'small',
                  disabled: params.row.isOriginal
                },
                on: {
                  click: () => {
                    if (params.row.$isEdit) {
                      this.$set(params.row, '$isEdit', false)
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
      schoolData: [
        {
          name: '同济大学本校',
          area: '杨浦区',
          longitude: '10.0.2',
          latitude: '9.56.45',
          location: '同济大学本校地址',
          description: '同济大学本校同济大学本校同济大学本校同济大学本校同济大学本校',
          isOriginal: true
        },
        {
          name: '同济大学北校',
          area: '普陀区',
          longitude: '10.0.2',
          latitude: '9.56.45',
          location: '同济大学本校地址',
          description: '同济大学本校同济大学本校同济大学本校同济大学本校同济大学本校',
          isOriginal: false
        },
        {
          name: '同济大学嘉定校区',
          area: '嘉定区',
          longitude: '10.0.2',
          latitude: '9.56.45',
          location: '同济大学本校地址',
          description: '同济大学本校同济大学本校同济大学本校同济大学本校同济大学本校',
          isOriginal: false
        }
      ]
    }
  },
  methods: {
    newSite () {

    }

  }
}
</script>

<style>
.bottomRight{
      position: absolute;
      bottom: 0px;
      right: 0px;
    }
</style>

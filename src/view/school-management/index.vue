<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="schoolForm" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="name" label="校区名称" :style="{'width': '400px'}">
            <Input v-model="schoolForm.name" placeholder="输入校区名称"></Input>
        </FormItem>
        <FormItem prop="area" label="所属区县" :style="{'width': '400px'}">
          <Select v-model="schoolForm.area">
            <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
          </Select>
        </FormItem>
        <Button type="primary" >增加</Button>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">校区列表</p>
      <Table stripe :columns="schoolColumns" :data="schoolData"></Table>
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
        area: ''
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
          isOriginal: true
        },
        {
          name: '同济大学北校',
          area: '普陀区',
          isOriginal: false
        },
        {
          name: '同济大学嘉定校区',
          area: '嘉定区',
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
/* .schoolItem{
    text-align: center;
    padding: 10px;
}
.schoolItem > .ivu-card > .ivu-card-body{
    display: flex;
    justify-content: space-around;
}
.zeroTip{
  color: red
}
.littleTitle{
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e8eaec;
  margin-bottom: 18px;
} */
</style>

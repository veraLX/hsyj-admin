<template>
  <div>
    <Card>
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="password" label="校区名称:" :style="{'width': '400px'}">
            <Input type="password" v-model="formInline.password" placeholder="输入景点名称"></Input>
        </FormItem>
        <Poptip confirm title="你确定要删除这个单子吗?" placement="right-end">
            <Button type="primary" >增加</Button>
        </Poptip>
      </Form>
    </Card>
    <Card :style="{'margin-top': '10px'}">
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
      formInline: {
        password: ''
      },
      ruleInline: {
        password: [
          { required: true, message: '请输入景点名称', trigger: 'blur' }
        ]
      },
      schoolColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '校区名称', key: 'name' },
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
              }, '新增'),
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
          isOriginal: true
        },
        {
          name: '同济大学北校',
          isOriginal: false
        },
        {
          name: '同济大学嘉定校区',
          isOriginal: false
        }
      ]
    }
  },
  methods: {

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

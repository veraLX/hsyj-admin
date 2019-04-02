<template>
  <div>
    <Card >
      <div slot="title">
        <p style="display:inline">留言</p>&nbsp;&nbsp;
        <Tag color="red">待审批留言数量 99 条</Tag>
      </div>
      <Table stripe :columns="MessageColumns" :data="MessageData"></Table>
      <Page :total="100" />
    </Card>
    <Card :style="{'margin-top': '10px'}">
      <p slot="title">学生账户</p>
      <Form ref="formInline" :model="formInline" inline :label-width="100">
        <FormItem prop="number" label="学生学籍号码" :style="{'width': '400px'}">
            <Input  v-model="formInline.number" placeholder="输入学生学籍号码"></Input>
        </FormItem>
        <Button type="primary">查询</Button>
        <Table stripe :columns="StudentColumns" :data="StudentData"></Table>
        <Page :total="100" />
      </Form>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      formInline: {
        number: ''
      },
      StudentColumns: [
        { title: '学生姓名', key: 'name' },
        { title: '学籍号', key: 'studentID' },
        { title: '手机号码', key: 'phone' },
        { title: '微信号码', key: 'weixin' }
      ],
      StudentData: [
        {
          name: ' 万苏文',
          studentID: '1111111111',
          phone: '1302589758',
          weixin: '123123'
        }
      ],
      MessageColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'name' },
        { title: '学籍号', key: 'studentID' },
        { title: '景点', key: 'site' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            if (!params.row.$isLogin) {
              return h('div', [
                h('Button', {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }
                }, '受理')
              ])
            } else {
              return h('div', [
                h('Button', {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small'
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '拒绝')
              ])
            }
          }
        }
      ],
      MessageData: [
        {
          name: ' 王毅王',
          studentID: '1111111111',
          site: '财大老门',
          time: '2019-05-01',
          content: '三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          $isLogin: false
        },
        {
          name: '苏毅王',
          studentID: '1111111111',
          site: 'APP首页',
          time: '2019-05-01',
          content: '更换手机号码，申请解绑',
          $isLogin: true
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style>

</style>

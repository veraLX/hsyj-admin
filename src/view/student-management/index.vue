<template>
  <div>
    <!-- <Card >
      <div slot="title">
        <p style="display:inline">留言</p>&nbsp;&nbsp;
        <Tag color="red">待审批留言数量 99 条</Tag>
      </div>
      <Table stripe :columns="MessageColumns" :data="MessageList"></Table>
      <Page :total="10" />
    </Card> -->
    <Card>
      <p slot="title">学生账户</p>
      <Form ref="formInline" :model="formInline" inline :label-width="100">
        <FormItem prop="stuno" label="学生学籍号码" :style="{'width': '400px'}">
            <Input  v-model="formInline.stuno" placeholder="输入学生学籍号码"/>
        </FormItem>
        <Button type="primary">查询</Button>
        <Table stripe :columns="StudentColumns" :data="studentList"></Table>
        <Page :total="100" />
      </Form>
    </Card>
  </div>
</template>

<script>
import {
  getMessageList,
  acceptMessage
} from '@/api/message'
import {
  getStudentList
} from '@/api/student'
export default {
  name: 'directive_page',
  data () {
    return {
      formInline: {
        stuno: '',
        studentname: '',
        tel: '',
        wxchat: ''
      },
      StudentColumns: [
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '手机号码', key: 'phone' },
        { title: '微信号码', key: 'weixin' }
      ],
      studentList: [
        {
          studentName: ' 万苏文',
          studentid: '1111111111',
          phone: '1302589758',
          weixin: '123123'
        }
      ],
      MessageColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '分类', key: 'distype' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 140,
          align: 'center',
          options: ['delete'],
          render: (h, params) => {
            if (params.row.targetaddress != null) {
              return h('div', [
                h('Button', {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      await acceptMessage({ id: 1, shstate: 1 })
                      this.getMessageList()
                    }
                  }
                }, '受理'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '拒绝')
              ])
            } else {
              return h('div', [
                h('Button', {
                  style: { 'margin-right': '8px' },
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      await acceptMessage({ id: 1, shstate: 1 })
                      this.getMessageList()
                    }
                  }
                }, '通过'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  }
                }, '删除')
              ])
            }
          }
        }
      ],
      MessageList: [
        {
          studentName: ' 王毅王',
          studentid: '1111111111',
          site: '财大老门',
          time: '2019-05-01',
          content: '三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          $isLogin: false
        },
        {
          studentName: '苏毅王',
          studentid: '1111111111',
          site: 'APP首页',
          time: '2019-05-01',
          content: '更换手机号码，申请解绑',
          $isLogin: true
        }
      ]
    }
  },
  mounted () {
    this.getMessageList()
    this.getStudentList()
  },
  methods: {
    async getMessageList () {
      const list = await getMessageList()
      this.MessageList = list.data.data.data ? list.data.data.data : []
      if (this.MessageList !== []) {
        this.MessageList.forEach((item) => {
          item.distype = this.getDistype(item.distype)
        })
      }
    },
    async getStudentList () {
      const list = await getStudentList(this.formInline)
      this.studentList = list.data.data.data ? list.data.data.data : []
    },
    getDistype (id) {
      // distype：留言类型0,景点; 1,活动,2 学校,3首页
      switch (id) {
        case 0:
          return '景点'
        case 1:
          return '活动'
        case 2:
          return '学校'
        case 3:
          return '首页'
      }
    }
  }
}
</script>

<style>

</style>

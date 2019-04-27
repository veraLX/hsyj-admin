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
        <Page :total="0" />
      </Form>
    </Card>
  </div>
</template>

<script>
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
      ]
    }
  },
  mounted () {
    this.getStudentList()
  },
  methods: {

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

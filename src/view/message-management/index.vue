<template>
  <div>
    <Card>
      <div slot="title">
        <p style="display:inline">留言</p>&nbsp;&nbsp;
        <Tag color="red">待审批留言数量 99 条</Tag>
      </div>
      <Tabs value="app">
        <TabPane label="首页留言" name="app">
          <Table :columns="appMessageColumns" :data="appMessageList"></Table>
          <Page :total="appCount"  @on-change="appChange"/>
        </TabPane>
        <TabPane label="景点留言" name="sight">
          <Table stripe :columns="sightMessageColumns" :data="sightMessageList"></Table>
          <Page :total="sightCount"  @on-change="sightChange"/>
        </TabPane>
        <TabPane label="活动留言" name="activity">
          <Table stripe :columns="activityMessageColumns" :data="activityMessageList"></Table>
          <Page :total="activityCount"  @on-change="activityChange"/>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { getMessageList, acceptMessage } from '@/api/message'
export default {
  name: 'directive_page',
  data () {
    return {
      appMessageColumns: [
        { type: 'selection', width: 60, align: 'center' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      await acceptMessage({ id: 1, shstate: 3 })
                      this.getMessageList()
                    }
                  }
                },
                '受理'
              ),
              h(
                'Poptip',
                {
                  props: {
                    confirm: true,
                    title: '你确定要拒绝吗?'
                  },
                  on: {
                    'on-ok': async () => {
                      await acceptMessage({ id: 1, shstate: 4 })
                      this.getMessageList()
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
                    '拒绝'
                  )
                ]
              )
            ])
          }
        }
      ],
      sightMessageColumns: [
        { type: 'selection', width: 60, align: 'center' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      await acceptMessage({ id: 1, shstate: 1 })
                      this.getMessageList()
                    }
                  }
                },
                '通过'
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
                      await acceptMessage({ id: 1, shstate: 2 })
                      this.getMessageList()
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
      activityMessageColumns: [
        { type: 'selection', width: 60, align: 'center' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
                    size: 'small'
                  },
                  on: {
                    click: async () => {
                      await acceptMessage({ id: 1, shstate: 1 })
                      this.getMessageList()
                    }
                  }
                },
                '通过'
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
                      await acceptMessage({ id: 1, shstate: 2 })
                      this.getMessageList()
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
      appMessageList: [],
      sightMessageList: [],
      activityMessageList: [],
      sightCount: 0,
      appCount: 0,
      activityCount: 0
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    async getMessageList () {
      const sightList = await getMessageList({ page: 1, pagesize: 10, distype: 0 })
      this.sightMessageList = sightList.data.data.data ? sightList.data.data.data : []
      this.sightCount = sightList.data.data.count ? sightList.data.data.count : 0
      const appList = await getMessageList({ page: 1, pagesize: 10, distype: 3 })
      this.appMessageList = appList.data.data.data ? appList.data.data.data : []
      this.appCount = appList.data.data.count ? appList.data.data.count : 0
      const activityList = await getMessageList({ page: 1, pagesize: 10, distype: 1 })
      this.activityMessageList = activityList.data.data.data ? activityList.data.data.data : []
      this.activityCount = activityList.data.data.count ? activityList.data.data.count : 0
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
    },
    async appChange (e) {
      const appList = await getMessageList({ page: e, pagesize: 10, distype: 3 })
      this.appMessageList = appList.data.data.data ? appList.data.data.data : []
    },
    async sightChange (e) {
      const sightList = await getMessageList({ page: e, pagesize: 10, distype: 0 })
      this.sightMessageList = sightList.data.data.data ? sightList.data.data.data : []
    },
    async activityChange (e) {
      const activityList = await getMessageList({ page: e, pagesize: 10, distype: 1 })
      this.activityMessageList = activityList.data.data.data ? activityList.data.data.data : []
    }
  }
}
</script>

<style>
</style>

<template>
  <div>
    <Card>
      <div slot="title">
        <p style="display:inline">留言</p>&nbsp;&nbsp;
        <Tag color="red">待审批留言数量 99 条</Tag>
      </div>
      <Tabs value="app" @on-click="tabsChange">
        <TabPane label="首页留言" name="app">
          <Table
            :columns="appMessageColumns"
            :data="appMessageList"
            @on-selection-change="onAppSelectionChange"
          ></Table>
          <Page :total="appCount" @on-change="appChange"/>
          <Row>
            <Col span="2">
              <Button @click="acceptance" type="primary">一键受理</Button>
            </Col>
            <Col span="2" style="margin-left:10px">
              <Button @click="refuse" type="error">一键拒绝</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="景点留言" name="sight">
          <Table
            stripe
            :columns="sightMessageColumns"
            :data="sightMessageList"
            @on-selection-change="onSightSelectionChange"
          ></Table>
          <Page :total="sightCount" @on-change="sightChange"/>
          <Row>
            <Col span="2">
              <Button @click="sightPass" type="primary">一键通过</Button>
            </Col>
            <Col span="2" style="margin-left:10px">
              <Button @click="sightDeleteFun" type="error">一键删除</Button>
            </Col>
          </Row>
        </TabPane>
        <TabPane label="活动留言" name="activity">
          <Table
            stripe
            :columns="activityMessageColumns"
            :data="activityMessageList"
            @on-selection-change="onActivitySelectionChange"
          ></Table>
          <Page :total="activityCount" @on-change="activityChange"/>
          <Row>
            <Col span="2">
              <Button @click="activityPass" type="primary">一键通过</Button>
            </Col>
            <Col span="2" style="margin-left:10px">
              <Button @click="activityDeleteFun" type="error">一键删除</Button>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { getMessageList, acceptMessage, recommendMessage } from '@/api/message'
export default {
  name: 'directive_page',
  data () {
    return {
      appMessageColumns: [
        { type: 'selection', width: 60, align: 'center', key: 'isCkeck' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期', key: 'time' },
        { title: '留言内容', key: 'content', width: 300 },
        {
          title: '状态',
          key: 'shstate',
          width: 100,
          render: (h, params) => {
            return h(
              'div',
              params.row.shstate
                ? params.row.shstate === 3
                  ? '已受理'
                  : '已拒绝'
                : ''
            )
          }
        },
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
                    await recommendMessage({
                      id: params.row.discussID,
                      isrecommend: params.row.isrecommend === 0 ? 1 : 0
                    })
                    this.getMessageList()
                  }
                }
              })
            ])
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 3
                      })
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 4
                      })
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
          title: '状态',
          key: 'shstate',
          width: 100,
          render: (h, params) => {
            return h(
              'div',
              params.row.shstate
                ? params.row.shstate === 1
                  ? '已通过'
                  : '已删除'
                : ''
            )
          }
        },
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
                    await recommendMessage({
                      id: params.row.discussID,
                      isrecommend: params.row.isrecommend === 0 ? 1 : 0
                    })
                    this.getMessageList()
                  }
                }
              })
            ])
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 1
                      })
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 2
                      })
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
          title: '状态',
          key: 'shstate',
          width: 100,
          render: (h, params) => {
            return h(
              'div',
              params.row.shstate
                ? params.row.shstate === 1
                  ? '已通过'
                  : '已删除'
                : ''
            )
          }
        },
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
                    await recommendMessage({
                      id: params.row.discussID,
                      isrecommend: params.row.isrecommend === 0 ? 1 : 0
                    })
                    this.getMessageList()
                  }
                }
              })
            ])
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 1
                      })
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
                      await acceptMessage({
                        id: params.row.discussID,
                        shstate: 2
                      })
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
      activityCount: 0,
      appMessageSelectedList: [],
      sightMessageSelectedList: [],
      activityMessageSelectedList: []
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    async getMessageList () {
      const sightList = await getMessageList({
        page: 1,
        pagesize: 10,
        distype: 0
      })
      this.sightMessageList = sightList.data.data.data
        ? sightList.data.data.data
        : []
      this.sightCount = sightList.data.data.count
        ? sightList.data.data.count
        : 0
      const appList = await getMessageList({
        page: 1,
        pagesize: 10,
        distype: 3
      })
      this.appMessageList = appList.data.data.data
        ? appList.data.data.data
        : []
      this.appCount = appList.data.data.count ? appList.data.data.count : 0
      const activityList = await getMessageList({
        page: 1,
        pagesize: 10,
        distype: 1
      })
      this.activityMessageList = activityList.data.data.data
        ? activityList.data.data.data
        : []
      this.activityCount = activityList.data.data.count
        ? activityList.data.data.count
        : 0
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
      const appList = await getMessageList({
        page: e,
        pagesize: 10,
        distype: 3
      })
      this.appMessageList = appList.data.data.data
        ? appList.data.data.data
        : []
    },
    async sightChange (e) {
      const sightList = await getMessageList({
        page: e,
        pagesize: 10,
        distype: 0
      })
      this.sightMessageList = sightList.data.data.data
        ? sightList.data.data.data
        : []
    },
    async activityChange (e) {
      const activityList = await getMessageList({
        page: e,
        pagesize: 10,
        distype: 1
      })
      this.activityMessageList = activityList.data.data.data
        ? activityList.data.data.data
        : []
    },
    tabsChange () {
      this.activityMessageSelectedList = []
      this.sightMessageSelectedList = []
      this.activityMessageSelectedList = []
    },
    async acceptance () {
      if (this.appMessageSelectedList.length !== 0) {
        for (const item of this.appMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 3 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要通过的留言')
      }
    },
    async refuse () {
      if (this.appMessageSelectedList.length !== 0) {
        for (const item of this.appMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 4 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要拒绝的留言')
      }
    },
    async sightPass () {
      if (this.sightMessageSelectedList.length !== 0) {
        for (const item of this.sightMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 1 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要通过的留言')
      }
    },
    async sightDeleteFun () {
      if (this.sightMessageSelectedList.length !== 0) {
        for (const item of this.sightMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 2 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要删除的留言')
      }
    },
    async activityPass () {
      if (this.activityMessageSelectedList.length !== 0) {
        for (const item of this.activityMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 1 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要通过的留言')
      }
    },
    async activityDeleteFun () {
      if (this.activityMessageSelectedList.length !== 0) {
        for (const item of this.activityMessageSelectedList) {
          await acceptMessage({ id: item.discussID, shstate: 2 })
        }
        this.getMessageList()
      } else {
        this.$Message.info('请选择要删除的留言')
      }
    },
    onSelect (e) {
      // console.log('onSelect', e)
    },
    onAppSelectionChange (list) {
      this.appMessageSelectedList = list
      // console.log('onAppSelectionChange', this.appMessageSelectedList)
    },
    onSightSelectionChange (list) {
      this.sightMessageSelectedList = list
      // console.log('onSightSelectionChange', this.sightMessageSelectedList)
    },
    onActivitySelectionChange (list) {
      this.activityMessageSelectedList = list
      // console.log(
      //   'onActivitySelectionChange',
      //   this.activityMessageSelectedList
      // )
    },
    onSelectAll (e) {
      // console.log('onSelectAll', e)
    }
  }
}
</script>

<style>
</style>

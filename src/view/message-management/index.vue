<template>
  <div>
    <Card>
      <div slot="title">
        <p style="display:inline">留言</p>&nbsp;&nbsp;
        <Tag color="red">待审批留言数量 {{unresoluved}} 条</Tag>
      </div>
      <Tabs value="commonSight" @on-click="tabsChange">
        <TabPane label="景点留言" name="commonSight">
          <Table
            stripe
            :columns="sightMessageColumns"
            :data="sightMessageList"
            @on-selection-change="onSightSelectionChange"
          ></Table>
          <!-- <Page :total="sightCount" @on-change="sightChange"/> -->
          <Page show-total :total="sightCount" :current="sightCurrentPage" :page-size="sightPageSize" @on-change="sightChange"/>
          <Row>
            <Col span="2">
              <Button @click="sightPass" type="primary">一键通过</Button>
            </Col>
            <Col span="2" style="margin-left:10px">
              <Button @click="sightDeleteFun" type="error">一键删除</Button>
            </Col>
          </Row>
        </TabPane>
        <!-- <TabPane label="活动景点留言" name="activitySight">
          <Table
            :columns="activitySightMessageColumns"
            :data="sightActivityMessageList"
            @on-selection-change="onSightActivitySelectionChange"
          ></Table>
          <Page :total="sightActivityCount" @on-change="sightActivityChange"/>
          <Row>
            <Col span="2">
              <Button @click="sightActivityPass" type="primary">一键通过</Button>
            </Col>
            <Col span="2" style="margin-left:10px">
              <Button @click="sightActivityDeleteFun" type="error">一键删除</Button>
            </Col>
          </Row>
        </TabPane> -->
        <TabPane label="活动留言" name="activity">
          <Table
            stripe
            :columns="activityMessageColumns"
            :data="activityMessageList"
            @on-selection-change="onActivitySelectionChange"
          ></Table>
          <!-- <Page :total="activityCount" @on-change="activityChange"/> -->
          <Page show-total :total="activityCount" :current="activityCurrentPage" :page-size="activityPageSize" @on-change="activityChange"/>
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
import { getMessageList, acceptMessage } from '@/api/message'
export default {
  name: 'directive_page',
  data () {
    return {
      sightActivityMessageList: [],
      sightMessageList: [],
      activityMessageList: [],
      //
      sightCount: 0,
      sightCurrentPage: 0,
      sightPageSize: 0,
      // sightActivityCount: 0,
      //
      activityCount: 0,
      activityCurrentPage: 0,
      activityPageSize: 0,
      //
      sightActivityMessageSelectedList: [],
      sightMessageSelectedList: [],
      activityMessageSelectedList: [],
      unresoluved: 0,
      sightMessageColumns: [
        { type: 'selection', width: 60, align: 'center' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期',
          key: 'createdate',
          render: (h, params) => {
            let index = params.row.createdate.indexOf('T')
            let time = params.row.createdate.slice(0, index)
            return h(
              'div',
              time
            )
          }
        },
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
      // activitySightMessageColumns: [
      //   { type: 'selection', width: 60, align: 'center' },
      //   // { title: ' ', type: 'index', width: 60, align: 'center' },
      //   { title: '学生姓名', key: 'studentName' },
      //   { title: '学籍号', key: 'studentid' },
      //   { title: '留言日期',
      //     key: 'createdate',
      //     render: (h, params) => {
      //       let index = params.row.createdate.indexOf('T')
      //       let time = params.row.createdate.slice(0, index)
      //       return h(
      //         'div',
      //         time
      //       )
      //     }
      //   },
      //   { title: '留言内容', key: 'content', width: 300 },
      //   {
      //     title: '状态',
      //     key: 'shstate',
      //     width: 100,
      //     render: (h, params) => {
      //       return h(
      //         'div',
      //         params.row.shstate
      //           ? params.row.shstate === 1
      //             ? '已通过'
      //             : '已删除'
      //           : ''
      //       )
      //     }
      //   },
      //   {
      //     title: '操作',
      //     key: 'action',
      //     width: 140,
      //     align: 'center',
      //     options: ['delete'],
      //     render: (h, params) => {
      //       return h('div', [
      //         h(
      //           'Button',
      //           {
      //             style: { 'margin-right': '8px' },
      //             props: {
      //               type: 'primary',
      //               size: 'small'
      //             },
      //             on: {
      //               click: async () => {
      //                 await acceptMessage({
      //                   id: params.row.discussID,
      //                   shstate: 1
      //                 })
      //                 this.getMessageList()
      //               }
      //             }
      //           },
      //           '通过'
      //         ),
      //         h(
      //           'Poptip',
      //           {
      //             props: {
      //               confirm: true,
      //               title: '你确定要删除吗?'
      //             },
      //             on: {
      //               'on-ok': async () => {
      //                 await acceptMessage({
      //                   id: params.row.discussID,
      //                   shstate: 2
      //                 })
      //                 this.getMessageList()
      //               }
      //             }
      //           },
      //           [
      //             h(
      //               'Button',
      //               {
      //                 props: {
      //                   type: 'error',
      //                   size: 'small',
      //                   disabled: params.row.isOriginal
      //                 }
      //               },
      //               '删除'
      //             )
      //           ]
      //         )
      //       ])
      //     }
      //   }
      // ],
      activityMessageColumns: [
        { type: 'selection', width: 60, align: 'center' },
        // { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '学生姓名', key: 'studentName' },
        { title: '学籍号', key: 'studentid' },
        { title: '留言日期',
          key: 'createdate',
          render: (h, params) => {
            let index = params.row.createdate.indexOf('T')
            let time = params.row.createdate.slice(0, index)
            return h(
              'div',
              time
            )
          }
        },
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
      ]
    }
  },
  mounted () {
    this.getMessageList()
  },
  methods: {
    async getMessageList () {
      this.unresoluved = 0
      // 景点列表
      const sightList = await getMessageList({
        page: 1,
        pagesize: 10,
        distype: 0
      })
      // let sortList1 = []
      // let sortNumber1 = 0
      // _.each(sightList.data.data.data, (list) => {
      //   if (!list.shstate) {
      //     this.unresoluved++
      //   }
      //   // if (list.scenerytype !== 1) {
      //   //   sortList1.push(list)
      //   //   sortNumber1++
      //   // }
      // })
      this.unresoluved = sightList.data.data.waitApprove
      this.sightPageSize = sightList.data.data.pageSize
      this.sightCurrentPage = sightList.data.data.currentPage
      this.sightMessageList = sightList.data.data.data ? sightList.data.data.data : []
      this.sightCount = sightList.data.data.count ? sightList.data.data.count : 0
      // 活动景点列表
      // const sightActivityList = await getMessageList({
      //   page: 1,
      //   pagesize: 10,
      //   distype: 0
      // })
      // let sortList = []
      // let sortNumber = 0
      // _.each(sightActivityList.data.data.data, (list) => {
      //   if (!list.shstate) {
      //     this.unresoluved++
      //   }
      //   if (list.scenerytype === 1) {
      //     sortList.push(list)
      //     sortNumber++
      //   }
      // })
      // this.sightActivityMessageList = sortList || []
      // this.sightActivityCount = sortNumber || 0
      // 活动列表
      const activityList = await getMessageList({
        page: 1,
        pagesize: 10,
        distype: 1
      })
      // _.each(activityList.data.data.data, (list) => {
      //   if (!list.shstate) {
      //     this.unresoluved++
      //   }
      // })
      this.unresoluved = activityList.data.data.waitApprove + this.unresoluved
      this.activityPageSize = activityList.data.data.pageSize
      this.activityCurrentPage = activityList.data.data.currentPage
      this.activityCount = activityList.data.data.count ? activityList.data.data.count : 0
      this.activityMessageList = activityList.data.data.data ? activityList.data.data.data : []
    },
    getDistype (id) {
      // distype：留言类型0,景点; 1,活动,2 学校,3首页
      // switch (id) {
      //   case 0:
      //     return '景点'
      //   case 1:
      //     return '活动'
      //   case 2:
      //     return '学校'
      //   case 3:
      //     return '首页'
      // }
    },
    // async sightActivityChange (e) {
    //   const sightActivityList = await getMessageList({
    //     page: e,
    //     pagesize: 10,
    //     distype: 0
    //   })
    //   let sortList = []
    //   _.each(sightActivityList.data.data.data, (list) => {
    //     if (list.scenerytype === 1) {
    //       sortList.push(list)
    //     }
    //   })
    //   this.sightActivityMessageList = sortList || []
    // },
    async sightChange (e) {
      const sightList = await getMessageList({
        page: e,
        pagesize: 10,
        distype: 0
      })
      // let sortList = []
      // _.each(sightList.data.data.data, (list) => {
      //   if (list.scenerytype === 1) {
      //     sortList.push(list)
      //   }
      // })
      this.sightPageSize = sightList.data.data.pageSize
      this.sightCurrentPage = sightList.data.data.currentPage
      this.sightMessageList = sightList.data.data.data ? sightList.data.data.data : []
      this.sightCount = sightList.data.data.count ? sightList.data.data.count : 0
    },
    async activityChange (e) {
      const activityList = await getMessageList({
        page: e,
        pagesize: 10,
        distype: 1
      })
      this.activityPageSize = activityList.data.data.pageSize
      this.activityCurrentPage = activityList.data.data.currentPage
      this.activityCount = activityList.data.data.count ? activityList.data.data.count : 0
      this.activityMessageList = activityList.data.data.data ? activityList.data.data.data : []
    },
    tabsChange () {
      this.activityMessageSelectedList = []
      this.sightMessageSelectedList = []
      this.activityMessageSelectedList = []
    },
    // async sightActivityPass () {
    //   if (this.sightActivityMessageSelectedList.length !== 0) {
    //     for (const item of this.sightActivityMessageSelectedList) {
    //       await acceptMessage({ id: item.discussID, shstate: 1 })
    //     }
    //     this.getMessageList()
    //   } else {
    //     this.$Message.info('请选择要通过的留言')
    //   }
    // },
    // async sightActivityDeleteFun () {
    //   if (this.sightActivityMessageSelectedList.length !== 0) {
    //     for (const item of this.sightActivityMessageSelectedList) {
    //       await acceptMessage({ id: item.discussID, shstate: 2 })
    //     }
    //     this.getMessageList()
    //   } else {
    //     this.$Message.info('请选择要拒绝的留言')
    //   }
    // },
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
    onSightActivitySelectionChange (list) {
      this.sightActivityMessageSelectedList = list
      // console.log('onSightActivitySelectionChange', this.sightActivityMessageSelectedList)
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

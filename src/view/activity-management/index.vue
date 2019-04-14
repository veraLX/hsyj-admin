<template>
  <div>
    <Card>
        <Table stripe :columns="activityColumns" :data="activityData"></Table>
        <Page :total="100" />
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      activityColumns: [
        { title: ' ', type: 'index', width: 20, align: 'center' },
        { title: '活动名称', key: 'name' },
        { title: '主办方', key: 'sponsor' },
        { title: '协办方', key: 'coSponsor' },
        { title: '主会场', key: 'mainVenue' },
        { title: '活动模式', key: 'activityMode' },
        { title: '开始日期', key: 'startDate' },
        { title: '结束日期', key: 'endDate' },
        { title: '涉及高校', key: 'universities' },
        { title: '学校数', key: 'universitiesNumber', width: 72 },
        { title: '景点数量', key: 'scenicNumber', width: 84 },
        { title: '题目数量', key: 'questionsNumber', width: 84 },
        { title: '通关阈值', key: 'clearanceThreshold', width: 84 },
        { title: '描述', key: 'describe' },
        { title: '图片预览' },
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
              }, '修改'),
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
      activityData: [
        {
          name: '财大一日游',
          sponsor: '上海财经大学',
          coSponsor: '复旦大学',
          mainVenue: '财大本校',
          activityMode: '团体赛',
          startDate: '2019-05-01 10:00',
          endDate: '2019-05-01',
          universities: '上海财经大学、复旦大学、同济大学',
          universitiesNumber: 3,
          scenicNumber: 24,
          questionsNumber: 11,
          clearanceThreshold: '3+18',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。'
        },
        {
          name: '财大一日游',
          sponsor: '上海财经大学',
          coSponsor: '复旦大学',
          mainVenue: '财大本校',
          activityMode: '个人',
          startDate: '2019-05-01 10:00',
          endDate: '2019-05-01',
          universities: '上海财经大学、复旦大学、同济大学',
          universitiesNumber: 3,
          scenicNumber: 24,
          questionsNumber: 11,
          clearanceThreshold: '3+18',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。'
        }
      ]

    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<template>
  <div>
    <Card>
      <p slot="title">景点列表</p>
      <Button type="primary" slot="extra" @click="newSite">增加景点</Button>
      <Table stripe :columns="siteColumns" :data="siteData"></Table>
    </Card>
    <Card :style="{'margin-top': '10px'}">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="password" label="校区名称:" :style="{'width': '400px'}">
            <Input type="password" v-model="formInline.password" placeholder="输入景点名称"></Input>
        </FormItem>
        <Poptip confirm title="你确定要删除这个单子吗?" placement="right-end">
            <Button type="primary" >增加</Button>
        </Poptip>
      </Form>
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
      ],
      siteColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '景点名称', key: 'name' },
        { title: '地点', key: 'location' },
        { title: '经度', key: 'longitude' },
        { title: '纬度', key: 'latitude' },
        { title: '描述', key: 'description', width: '200px' },
        { title: '图片预览' },
        { title: '音频URL地址', key: 'audioURL', width: '110px' },
        { title: '视频URL地址', key: 'videoURL', width: '110px' },
        {
          title: '操作',
          key: 'action',
          width: 140,
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
      siteData: [
        {
          name: '三好坞',
          location: '同济大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          audioURL: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videoURL: 'http://www.333ttt.com/up/?u=&page=2&id='
        },
        {
          name: '三好坞',
          location: '同济大学本校',
          longitude: '121.509621',
          latitude: '31.291241',
          description: '50年代师生义务劳动建成，取名三好，寓意学生做“三好学生”。由陈从周设计、题/n三好坞/n 三好坞(4张)/n 名。其下淌的水叫做同心河。都说这里是中国高校百大最美地方之一，建于1956年。1987年为迎接80周年校庆，全面整顿“三好坞”。三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          audioURL: 'http://www.333ttt.com/up/?u=&page=1&id=',
          videoURL: 'http://www.333ttt.com/up/?u=&page=2&id='
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

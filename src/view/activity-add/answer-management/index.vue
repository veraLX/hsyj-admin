<template>
  <div>
    <Card>
      <p slot="title">新增活动景点题目</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width="80">
        <FormItem label="景点选择" :style="{'width': '400px'}">
            <Select v-model="formInline.name" placeholder="输入景点">
              <!-- <Option v-for="item in columns" v-if="item.key !== 'handle'" :value="item.key" :key="`search-col-${item.key}`">{{ item.title }}</Option> -->
            </Select>
        </FormItem>
        <FormItem label="题干" :style="{'width': '400px'}">
            <Input type="textarea" v-model="formInline.question" placeholder="输入题干"></Input>
        </FormItem>
        <FormItem label="选项A" :style="{'width': '400px'}">
            <Input v-model="formInline.A" placeholder="输入选项A"></Input>
        </FormItem>
        <FormItem label="选项B" :style="{'width': '400px'}">
            <Input v-model="formInline.B" placeholder="输入选项B"></Input>
        </FormItem>
        <FormItem label="选项C" :style="{'width': '400px'}">
            <Input v-model="formInline.C" placeholder="输入选项C"></Input>
        </FormItem>
        <FormItem label="选项D" :style="{'width': '400px'}">
            <Input v-model="formInline.D" placeholder="输入选项D"></Input>
        </FormItem>
        <div class="rightButton">
            <Button type="primary">增加</Button>
        </div>
      </Form>
    </Card>
    <Card :style="{'margin-top': '20px'}">
      <p slot="title">答题列表</p>
      <Table stripe :columns="AnswerColumns" :data="AnswerData"></Table>
      <Page :total="100" />
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
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      AnswerColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '景点名称', key: 'name' },
        { title: '地点', key: 'site' },
        { title: '题干',
          key: 'question',
          width: 300,
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('textarea', {
                domProps: {
                  value: params.row.question
                },
                on: {
                  input: function (event) {
                    params.row.question = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.question)
            }
          }
        },
        { title: '选项A', key: 'A' },
        { title: '选项B', key: 'B' },
        { title: '选项C', key: 'C' },
        { title: '选项D', key: 'D' },
        { title: '正确答案', key: 'answer', width: 90 },
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
                  size: 'small'
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
                    size: 'small'
                  }
                }, '删除')
              ])
            ])
          }
        }
      ],
      AnswerData: [
        {
          name: '三好坞',
          site: '同济大学本校',
          question: '三好坞建设于（         ）年，三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          A: '1956年',
          B: '1965年',
          C: '1912年',
          D: '1987年',
          answer: 'A',
          $isEdit: false
        },
        {
          name: '三好坞',
          site: '同济大学本校',
          question: '三好坞建设于（         ）年，三好坞有三座亭子，湖心亭和两个在山上的，成为聚友、约会、休闲的好地方。',
          A: '1956年',
          B: '1965年',
          C: '1912年',
          D: '1987年',
          answer: 'A',
          $isEdit: false
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
.rightButton{
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;
}
</style>

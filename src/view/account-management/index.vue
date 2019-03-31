<template>
  <div>
    <Card >
      <p slot="title">新增机构</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="name" label="机构名称:" :style="{'width': '400px'}">
            <Input v-model="formInline.name" placeholder="输入机构名称"></Input>
        </FormItem>
        <Button type="primary">增加</Button>
      </Form>
    </Card>
    <Row :gutter="20" :style="{'margin-top': '10px'}">
      <i-col :xs="8" :md="8" :lg="4" class="schoolItem" v-for="(school, index) in schoolList" :key="index" @click="schoolDetail">
        <Card @click.native="schoolDetail(school)">
          <span>{{school.name}}</span>
          <span :class="school.totalPeople == 0 ? 'zeroTip' : ''">{{school.totalPeople}}<span :style="{'color': '#000'}">人</span></span>
        </Card>
      </i-col>
    </Row>
    <!-- <Card :style="{'margin-top': '20px'}">
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="password" label="机构名称:" :style="{'width': '400px'}">
            <Input type="password" v-model="formInline.password" placeholder="输入机构名称"></Input>
        </FormItem>
        <Button type="primary">增加</Button>
      </Form>
    </Card> -->
    <Modal
      v-model="schoolModal"
      width="50%"
      class="groupAdd">
      <p slot="header">
          <!-- <Icon type="ios-paper-outline"></Icon> -->
          <span>{{currentSchool.name}}</span>
      </p>
      <p class="littleTitle">新增管理员</p>
      <Form ref="formInline" :model="Administrator" :rules="ruleInline" inline :label-width="100">
        <FormItem prop="name" label="管理员账户" :style="{'width': '40%'}">
            <Input v-model="formInline.name" placeholder="输入管理员账户"></Input>
        </FormItem>
        <FormItem prop="password" label="管理员密码" :style="{'width': '40%'}">
            <Input v-model="formInline.password" placeholder="输入管理员密码"></Input>
        </FormItem>
        <Button type="primary">增加</Button>
      </Form>
      <p class="littleTitle">管理员列表</p>
      <Table stripe :columns="AdministratorColumns" :data="AdministratorData"></Table>
      <div slot="footer">
          <!-- <Button :size="buttonSize" type="primary" @click="groupUpdateMethod" >确定</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      currentSchool: '',
      schoolModal: false,
      formInline: {
        name: ''
      },
      Administrator: {
        name: '',
        password: ''
      },
      ruleInline: {
        password: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      schoolList: [
        { name: '上海财经大学', totalPeople: 5, isSchool: true },
        { name: '复旦大学', totalPeople: 0, isSchool: true },
        { name: '同济大学', totalPeople: 1, isSchool: true },
        { name: '华东师范大学', totalPeople: 2, isSchool: true },
        { name: '东华大学', totalPeople: 0, isSchool: true },
        { name: '上海海事大学', totalPeople: 1, isSchool: true },
        { name: '华东理工大学', totalPeople: 1, isSchool: true },
        { name: '上海财经大学', totalPeople: 5, isSchool: true },
        { name: '复旦大学', totalPeople: 0, isSchool: true },
        { name: '同济大学', totalPeople: 1, isSchool: true },
        { name: '华东师范大学', totalPeople: 2, isSchool: true },
        { name: '东华大学', totalPeople: 0, isSchool: true },
        { name: '上海海事大学', totalPeople: 1, isSchool: true },
        { name: '华东理工大学', totalPeople: 1, isSchool: true },
        { name: '上海市教育局委员会', totalPeople: 5, isSchool: false },
        { name: '虹口区教育局', totalPeople: 0, isSchool: false },
        { name: '杨浦区教育局', totalPeople: 1, isSchool: false }
      ],
      AdministratorColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '管理员账户',
          key: 'name',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.name
                },
                on: {
                  input: function (event) {
                    params.row.name = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.name)
            }
          }
        },
        { title: '管理员密码',
          key: 'password',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.password
                },
                on: {
                  input: function (event) {
                    params.row.password = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.password)
            }
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
      AdministratorData: [
        {
          name: 'fudan1',
          password: 'fd12345678',
          $isEdit: false
        },
        {
          name: 'fudan2',
          password: 'fd12345678',
          $isEdit: false
        }
      ]
    }
  },
  methods: {
    schoolDetail (school) {
      if (school.isSchool) {
        this.schoolModal = true
        this.currentSchool = school
      }
    }
  }
}
</script>

<style>
.schoolItem{
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
}
</style>

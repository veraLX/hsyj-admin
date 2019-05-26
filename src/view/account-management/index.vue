<template>
  <div>
    <Card >
      <p slot="title">新增机构</p>
      <Form ref="formInline" :model="formInline"  :rules="addSchoolRule" inline :label-width="80">
        <FormItem prop="schoolname" label="机构名称:" :style="{'width': '400px'}">
            <Input v-model="formInline.schoolname" placeholder="输入机构名称"/>
        </FormItem>
        <Button type="primary" @click="addSchool('formInline')">增加</Button>
      </Form>
    </Card>
    <Row :gutter="20" :style="{'margin-top': '10px'}">
      <i-col :xs="8" :md="8" :lg="4" class="schoolItem" v-for="(school, index) in schoolList" :key="index" @click="schoolDetail">
        <Card @click.native="schoolDetail(school)">
          <span>{{school.schoolName}}</span>
          <!-- <span :class="school.totalPeople == 0 ? 'zeroTip' : ''">{{school.totalPeople}}<span :style="{'color': '#000'}">人</span></span> -->
        </Card>
      </i-col>
    </Row>
    <!-- <Card :style="{'margin-top': '20px'}">
      <p slot="title">新增校区</p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :label-width="80">
        <FormItem prop="pwd" label="机构名称:" :style="{'width': '400px'}">
            <Input type="pwd" v-model="formInline.pwd" placeholder="输入机构名称"></Input>
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
      <Form ref="administrator" :model="administrator" :rules="administratorRule" inline :label-width="100">
        <FormItem prop="userName" label="管理员账户" :style="{'width': '40%'}">
            <Input v-model="administrator.userName" placeholder="输入管理员账户"/>
        </FormItem>
        <FormItem prop="pwd" label="管理员密码" :style="{'width': '40%'}">
            <Input v-model="administrator.pwd" placeholder="输入管理员密码"/>
        </FormItem>
        <Button type="primary" @click="addUser('administrator')">增加</Button>
      </Form>
      <p class="littleTitle">管理员列表</p>
      <Table stripe :columns="AdministratorColumns" :data="administratorList"></Table>
      <Page :total="administratorList.length" />
      <div slot="footer">
          <!-- <Button :size="buttonSize" type="primary" @click="groupUpdateMethod" >确定</Button> -->
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  addSchool, getAllSchoolList
} from '@/api/school'
import {
  addUser, getUserList, editUser, deleteUser
} from '@/api/user'
export default {
  name: 'directive_page',
  data () {
    return {
      currentSchool: {},
      schoolModal: false,
      formInline: {
        schoolname: '',
        parentid: -1
      },
      administrator: {
        userName: '',
        pwd: '',
        usertype: 0,
        schoolid: ''
      },
      addSchoolRule: {
        schoolname: [
          { required: true, message: '请输入机构名称', trigger: 'blur' }
        ]
      },
      administratorRule: {
        userName: [
          { required: true, message: '请输入管理员账户', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '请输入管理员密码', trigger: 'blur' }
        ]
      },
      schoolList: [],
      AdministratorColumns: [
        { title: ' ', type: 'index', width: 60, align: 'center' },
        { title: '管理员账户',
          key: 'userName',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.userName
                },
                on: {
                  input: function (event) {
                    params.row.userName = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.userName)
            }
          }
        },
        { title: '管理员密码',
          key: 'pwd',
          render: (h, params) => {
            if (params.row.$isEdit) {
              return h('input', {
                domProps: {
                  value: params.row.pwd
                },
                on: {
                  input: function (event) {
                    params.row.pwd = event.target.value
                  }
                }
              })
            } else {
              return h('div', params.row.pwd)
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
                  click: async () => {
                    if (params.row.$isEdit) {
                      this.$set(params.row, '$isEdit', false)
                      let obj = {
                        userName: params.row.userName,
                        pwd: params.row.pwd,
                        usertype: params.row.usertype,
                        schoolid: params.row.schoolid,
                        sysUserID: params.row.sysUserID
                      }
                      await editUser(obj)
                      this.getUserList(params.row.schoolid)
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
                    await deleteUser(params.row.sysUserID)
                    this.getUserList(params.row.schoolid)
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
      administratorList: [ ]
    }
  },
  mounted () {
    this.getSchoolList()
  },
  methods: {
    async getSchoolList () {
      const list = await getAllSchoolList({ page: 1, pageSize: 300 })
      this.schoolList = list.data.data.data ? list.data.data.data : []
    },
    async getUserList (id) {
      const list = await getUserList(id)
      this.administratorList = list.data.data ? list.data.data : []
    },
    async schoolDetail (school) {
      if (school.schoolID) {
        this.schoolModal = true
        this.currentSchool = school
        this.$set(this.administrator, 'schoolid', school.schoolID)
        this.getUserList(school.schoolID)
      }
    },
    addUser (name) {
      // if (this.administrator.userName !== '' && this.administrator.pwd !== '') {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          await addUser(this.administrator)
          this.getUserList(this.administrator.schoolid)
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })

      this.administrator = {
        userName: '',
        pwd: '',
        usertype: 0,
        schoolid: this.administrator.schoolid
      }
      // } else if (this.administrator.userName === '') {
      //   this.$Message.info('管理员账户不能为空')
      // } else {
      //   this.$Message.info('管理员密码不能为空')
      // }
    },
    addSchool (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          this.$Message.success('Success!')
          await addSchool(this.formInline)
          this.getSchoolList()
        } else {
          this.$Message.error('Fail!')
        }
      })
      // if (this.formInline.schoolname !== '') {
      // } else {
      // this.$Message.info('机构名称不能为空')
      // }
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

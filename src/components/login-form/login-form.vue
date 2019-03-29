<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <!-- <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span> -->
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <!-- <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span> -->
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input v-model="form.code" placeholder="请输入验证码" style="width:66%;margin-right:4%">
        <!-- <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span> -->
      </Input>
       <Input v-model="form.code" placeholder="图片" style="width:30%">
        <!-- <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span> -->
      </Input>
    </FormItem>
    <FormItem>
      <Button type="default" style="width:48%;margin-right:4%">清空</Button>
      <Button @click="handleSubmit" type="primary" style="width:48%">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name: 'LoginForm',
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      form: {
        userName: 'super_admin',
        password: 'super_admin',
        code: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      }
    }
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            userName: this.form.userName,
            password: this.form.password
          })
        }
      })
    }
  }
}
</script>

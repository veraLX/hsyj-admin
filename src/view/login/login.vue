<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <p class="login-title">上海高校文化印记在线社区</p>
    <div class="login-con">
      <Card dis-hover icon="log-in" title="管理平台登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.handleLogin({ userName, password }).then(res => {
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      })
    }
  }
}
</script>

<style scoped>
.login-title{
    color: red;
    font-size: 60px;
    font-weight: bold;
    text-shadow: 0 0 5px #aaa;
    text-align: center;
    position: relative;
    top: 20%;
}

</style>

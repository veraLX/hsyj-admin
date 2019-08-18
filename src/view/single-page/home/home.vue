<template>
  <div v-if="user.token">
    <admin v-if="isAdmin" :user="user"/>
    <manager v-else :user="user"/>
  </div>
</template>

<script>
import admin from './admin'
import manager from './manager'
export default {
  name: 'home',
  components: {
    admin,
    manager
  },
  data () {
    return {
      isAdmin: false,
      user: {}
    }
  },
  methods: {

  },
  async mounted () {
    const user = JSON.parse(sessionStorage.getItem('user'))
    if (user.usertype) {
      this.isAdmin = true
    }
    this.user = user
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>

<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
.size{
  width: 100%;
  height: 100%;
}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
}
.ivu-card-head{
    border-bottom: none!important;
    padding: 0!important;
    > p{
      color: red!important;
      font-size: 30px!important;
      font-weight: bold!important;
      text-shadow: 0 0 5px #aaa!important;
      height: 35px!important;
      line-height: 35px!important;
    }
}
</style>

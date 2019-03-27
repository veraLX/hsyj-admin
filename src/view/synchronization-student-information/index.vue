<template>
  <div>
    <Card class="studentInfo">
      <Button size="large" type="primary" >同步易班数据</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.studentInfo{
  width: 100%;
  height: 400px;
  text-align: center;
  vertical-align: middle
}
.studentInfo  button{
  margin-top: 160px;
}
</style>

<template>
  <div>
    <Card class="schoolInfo">
      <div class="schoolData">当前学校数据{{schoolListNumber}}条</div>
      <Button size="large" type="primary" >导入学校数据</Button>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'directive_page',
  data () {
    return {
      schoolListNumber: 1
    }
  },
  methods: {
  }
}
</script>

<style>
.schoolInfo{
  width: 100%;
  height: 400px;
  text-align: center;
  vertical-align: middle
}
.schoolData{
    height: 100px;
    line-height: 100px;
    display: inline-block;
    font-size: 16px;
    width: 200px;
    border: 1px solid #444;
    border-radius: 4px;
    margin: 60px 0 20px 0;
}
.schoolInfo .ivu-card-body{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>

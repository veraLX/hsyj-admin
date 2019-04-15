<template>
    <div>
        <p class="subTitle">图片列表</p>
        <!-- <div class="demo-upload-list" v-for="(item,index) in uploadList" :key="index">
            <img :src="item.url">
        </div> -->
        <p class="subTitle">上传图片</p>
        <iframe src="http://hsyj.100eduonline.com/static/images/admin/uploadComponent/upload.html" height="120" width="100%" style="border: none;overflow:hidden"/>
    </div>
</template>
<script>
export default {
  name: 'upload_page',
  components: {
  },
  data () {
  }
}
</script>
<style>
.subTitle{
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0;
}
</style>

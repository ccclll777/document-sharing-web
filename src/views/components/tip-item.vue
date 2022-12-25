<template>
  <el-row class="tip-item">
    <div class="left" />
    <div class="name">{{ name }}</div>
  </el-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>
  .tip-item {
    margin: 8px;
    height: 32px;
  }

  .left {
    float: left;
    width: 6px;
    height: 32px;
    background: #1482f0;
    margin-right: 8px;
  }

  .name {
    font-size: 15px;
    color: #000000;
    text-align: left;
    line-height: 32px;
  }
</style>

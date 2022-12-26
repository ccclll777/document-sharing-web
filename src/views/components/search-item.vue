<template>
  <el-card class="blog-item">
    <div class="title" @click="openFile" v-html="name" />
    <div class="text" v-html="description" />
  </el-card>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  methods: {
    openFile() {
      this.$router.push({ path: '/detail/file/' + this.id })
    }
  }
}
</script>

<style scoped>
  .blog-item {
    margin: 8px;
  }

  .title {
    margin: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 24px;
    text-align: left;
    color: #1482f0;
  }

  .text {
    margin: 8px;
    font-size: 13px;
    line-height: 20px;
    text-align: left;
    color: #888888;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    overflow: hidden;
  }
</style>

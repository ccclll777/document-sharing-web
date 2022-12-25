<template>
  <el-card class="blog-item">
    <div class="title" @click="openBlog" v-html="title" />
    <div class="text" v-html="text" />
  </el-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    }
  },
  methods: {
    openBlog() {
      this.$router.push({ path: '/detail/blog/' + this.id })
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

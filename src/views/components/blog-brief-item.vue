<template>
  <el-row class="blog-item">
    <div class="title" @click="openBlog">{{ title }}</div>
    <div class="date">{{ author }} / {{ date }}</div>
  </el-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
    },
    author: {
      type: String,
      default: ''
    },
    date: {
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
    width: 100%;
  }

  .title {
    font-size: 14px;
    cursor: pointer;
    line-height: 32px;
    text-align: left;
    color: #444444;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .date {
    font-size: 12px;
    line-height: 28px;
    text-align: left;
    color: #888888;
    border-bottom: 1px solid #eeeeee;
  }
</style>

<template>
  <el-card class="blog-item">
    <el-row>
      <div style="width: 40px; float: left">
        <el-image class="blog-pic" src="https://s1.ax1x.com/2020/06/13/tvjFGd.png" />
      </div>
      <span class="date">{{ author }} / {{ date }}</span>
      <div style="float: right">
        <svg-icon icon-class="view" />
        <span class="date">{{ view }}</span>
        <svg-icon icon-class="like" />
        <span class="date">{{ like }}</span>
      </div>
    </el-row>
    <div class="title" @click="openBlog">{{ title }}</div>
    <div class="text">{{ text }}</div>
    <div><el-tag style="margin: 8px;">#{{ category }}</el-tag></div>
  </el-card>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    view: {
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
    },
    author: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      default: '未知标签'
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
.blog-pic{
  border-radius: 100%;
  width: 32px;
  height: 32px;
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

  .date {
    margin: 8px;
    font-size: 12px;
    line-height: 32px;
    text-align: left;
    color: #555555;
  }
</style>

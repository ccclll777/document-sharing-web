<template>
  <div class="blog-item">
    <el-row>
      <el-col style="width: auto; margin-right: 8px">
        <div style="margin-top: 8px">{{ rank }}</div>
      </el-col>
      <el-col style="width: 80%">
        <span class="title" @click="openBlog">{{ title }}</span>
      </el-col>
    </el-row>
    <el-row>
      <div v-if="ratingCount / 888 < 10000" class="date" style="margin-left: 24px">{{ (ratingCount / 888).toFixed(0) }} 热度</div>
      <div v-if="ratingCount / 888 >= 10000" class="date" style="margin-left: 24px">{{ (ratingCount / 8880000).toFixed(1) }}w 热度</div>
    </el-row>
  </div>
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
    rank: {
      type: Number,
      default: 1
    },
    ratingCount: {
      type: Number,
      default: 0
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

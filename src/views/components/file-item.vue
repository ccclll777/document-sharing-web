<template>
  <el-row class="blog-item">
    <div class="title" @click="openFile">{{ name }}</div>
  </el-row>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    id: {
      type: Number,
      default: 0
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
  width: 100%;
}

.title {
  font-size: 14px;
  cursor: pointer;
  line-height: 24px;
  text-align: left;
  color: #444444;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
</style>

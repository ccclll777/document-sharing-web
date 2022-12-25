<template>
  <el-row class="tag-item">
    <svg-icon :icon-class="tag" />
    <span class="name" @click="openView">{{ name }}</span>
  </el-row>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    tag: {
      type: String,
      default: 'rank'
    },
    type: {
      type: Number,
      default: 1
    }
  },
  methods: {
    openView() {
      if (this.type === 1) {
        this.$router.push({ path: '/detail/tag/' + this.id })
      } else {
        this.$router.push({ path: '/detail/origin/' + this.id })
      }
    }
  }
}
</script>

<style scoped>
  .tag-item {
    margin: 8px;
    border-bottom: 1px solid #eeeeee;
  }

  .name {
    margin-left: 8px;
    font-size: 14px;
    color: #444444;
    text-align: left;
    cursor: pointer;
    line-height: 36px;
  }
</style>

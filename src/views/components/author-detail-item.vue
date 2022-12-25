<template>
  <el-card class="author-item">
    <el-row>
      <el-col style="width: auto; float: left">
        <el-image class="author-pic" src="https://s1.ax1x.com/2020/06/16/NiMrZj.png" />
      </el-col>
      <el-col style="width: auto">
        <div class="name" @click="openView">{{ title }}</div>
        <span class="description">{{ url }}</span>
      </el-col>
    </el-row>
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
    url: {
      type: String,
      default: ''
    }
  },
  methods: {
    openView() {
      this.$router.push({ path: '/detail/origin/' + this.id })
    }
  }
}
</script>

<style scoped>
  .author-item {
    margin: 8px;
  }
  .author-pic{
    border-radius: 100%;
    width: 48px;
    height: 48px;
    margin: 8px;
  }
  .name {
    cursor: pointer;
    margin: 8px;
    font-size: 15px;
    line-height: 24px;
    text-align: left;
    color: #1482f0;
  }

  .description {
    margin: 8px;
    font-size: 13px;
    line-height: 16px;
    text-align: left;
    color: #555555;
  }
</style>

<template>
  <el-card class="tag-detail-item">
    <el-row>
      <el-col style="width: auto; float: left">
        <el-image class="author-pic" src="https://s1.ax1x.com/2020/06/15/NCFLTg.png" />
      </el-col>
      <el-col style="width: auto">
        <div class="name" @click="openView"># {{ name }}</div>
        <el-tag type="info" effect="plain" class="description"># {{ name }}</el-tag>
        <span v-for="(item,index) in descriptionList" :key="item">
          <el-tag v-if="index < 4 && item !== '\n'" type="info" effect="plain" class="description"># {{ item }}</el-tag>
        </span>
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
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      descriptionList: []
    }
  },
  created() {
    this.descriptionList = this.splitDescription(this.description)
  },
  methods: {
    splitDescription(data) {
      return data.split('#')
    },
    openView() {
      this.$router.push({ path: '/detail/tag/' + this.id })
    }
  }
}
</script>

<style scoped>
  .tag-detail-item {
    margin: 8px;
  }
  .author-pic{
    border-radius: 100%;
    width: 48px;
    height: 48px;
    margin: 20px 8px;
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
    font-size: 12px;
  }
</style>

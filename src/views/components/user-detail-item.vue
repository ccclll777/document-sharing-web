<template>
  <el-card class="user-item">
    <el-row>
      <el-col style="width: 80px">
        <el-image class="user-pic" src="https://s1.ax1x.com/2020/06/13/tvLvWR.png" />
      </el-col>
      <el-col :span="12">
        <div class="name">{{ name }}</div>
        <span class="description">{{ description }}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <div class="number-text">订阅量</div>
        <div class="number">{{ sub }}</div>
      </el-col>
      <el-col :span="8">
        <div class="number-text">点赞量</div>
        <div class="number">{{ like }}</div>
      </el-col>
      <el-col :span="8">
        <div class="number-text">阅读量</div>
        <div class="number">{{ read }}</div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    sub: {
      type: Number,
      default: 0
    },
    like: {
      type: Number,
      default: 0
    },
    read: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
  .user-item {
    margin: 8px;
  }
  .user-pic{
    border-radius: 100%;
    width: 64px;
    height: 64px;
  }
  .name {
    margin: 8px;
    font-size: 15px;
    line-height: 24px;
    text-align: left;
    color: #228822;
  }

  .description {
    margin: 8px;
    font-size: 12px;
    line-height: 24px;
    text-align: left;
    color: #555555;
  }

  .number-text {
    margin: 8px;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: #555555;
  }

  .number {
    margin: 8px;
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    text-align: center;
    color: #222222;
  }
</style>

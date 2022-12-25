<template>
  <div style="margin: 8px 16px;">
    <el-col :span="6">
      <div style="margin: 8px">
        <tip-item name="流行标签" />
        <div v-for="item in topTagList" :key="item.id">
          <tag-item v-if="item.name!=='未知标签'" :id="item.id" :name="item.name" />
        </div>
        <tip-item name="热门博文" />
        <div v-for="item in hotList" :key="item.id">
          <blog-brief-item :id="item.id" :title="item.title" :author="item.author" :date="item.updateTime" />
        </div>
      </div>
    </el-col>
    <el-col :span="12">
      <div style="margin: 8px">
        <tip-item name="猜你喜欢" />
        <div v-for="item in recommendList" :key="item.id">
          <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
        </div>
      </div>
    </el-col>
    <el-col :span="6">
      <div style="margin: 8px">
        <tip-item name="最新收录" />
        <el-timeline style="margin-left: -32px; margin-top: 16px">
          <el-timeline-item v-for="item in latestList" :key="item.id" :timestamp="item.updateTime" placement="top">
            <blog-item :id="item.id" :title="item.title" />
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import BlogBriefItem from '@/views/components/blog-brief-item'
import BlogDetailItem from '@/views/components/blog-detail-item'
// import { getArticlesByFreshPopular, getArticlesByHisCategory, getRecentArticles, getTagListByCount } from '@/api/blog'
import BlogItem from '@/views/components/blog-item'
import TagItem from '@/views/components/tag-item'

export default {
  components: { TagItem, BlogItem, BlogDetailItem, BlogBriefItem, TipItem },
  data() {
    return {
      topTagList: [],
      recommendList: [],
      hotList: [],
      latestList: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    searchFunc() {

    },
    fetchList() {
      // var that = this
      // getRecentArticles(1, 15).then(response => {
      //   const { data } = response
      //   that.latestList = data
      // })
      // getArticlesByFreshPopular(1, 15).then(response2 => {
      //   const { data } = response2
      //   that.hotList = data
      // })
      // getArticlesByHisCategory().then(response3 => {
      //   const { data } = response3
      //   that.recommendList = data
      // })
      // getTagListByCount(1, 7).then(response4 => {
      //   const { data } = response4
      //   that.topTagList = data
      // })
    }
  }
}
</script>

<style scoped>

</style>

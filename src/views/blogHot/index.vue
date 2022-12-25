<template>
  <div style="margin: 8px">
    <el-col :span="13" style="margin-left: 8.3%">
      <div style="margin: 8px">
        <el-tabs>
          <el-tab-pane label="最新博文">
            <div v-for="item in latestList" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="高赞博文">
            <div v-for="item in likeList" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="热门标签">
            <span v-for="item in tagList" :key="item.id">
              <tag-detail-item v-if="item.name !== '未知标签'" :id="item.id" :name="item.name" :description="item.description" />
            </span>
          </el-tab-pane>
          <el-tab-pane label="热门博主">
            <div v-for="item in bloggerList" :key="item.id">
              <author-detail-item :id="item.id" :title="item.title" :url="item.url" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :span="7">
      <div style="margin: 8px">
        <tip-item name="博文热榜" />
        <div v-for="(item,index) in hotList" :key="item.id">
          <blog-top-item :id="item.id" :title="item.title" :rank="index + 1" :rating-count="item.ratingCount" />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import BlogDetailItem from '@/views/components/blog-detail-item'
import {
  getArticleListByLikeCount,
  getArticlesByFreshPopular, getBloggerList,
  getRecentArticles, getTagListByCount
} from '@/api/blog'
import BlogTopItem from '@/views/components/blog-top-item'
import AuthorDetailItem from '@/views/components/author-detail-item'
import TagDetailItem from '@/views/components/tag-detail-item'

export default {
  components: { TagDetailItem, AuthorDetailItem, BlogTopItem, BlogDetailItem, TipItem },
  data() {
    return {
      latestList: [],
      likeList: [],
      hotList: [],
      tagList: [],
      bloggerList: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      var that = this
      getArticlesByFreshPopular(1, 30).then(response => {
        const { data } = response
        that.hotList = data
      })
      getRecentArticles(1, 10).then(response => {
        const { data } = response
        that.latestList = data
      })
      getArticleListByLikeCount(1, 10).then(response => {
        const { data } = response
        that.likeList = data
      })
      getTagListByCount(1, 20).then(response => {
        const { data } = response
        that.tagList = data
      })
      getBloggerList(1, 20).then(response => {
        const { data } = response
        that.bloggerList = data
      })
    }
  }
}
</script>

<style scoped>

</style>

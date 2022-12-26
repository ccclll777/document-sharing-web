<template>
  <div style="margin: 8px">
    <el-col :span="16" style="margin: 8px 8px 8px 4.1%">
      <el-row class="title">{{ blog.title }}</el-row>
      <div class="tag">
        <span style="color: #1482f0">{{ blog.author }}</span> <span>{{ blog.updateTime }}</span>
        <span style="float: right; color: #444444">
          <svg-icon icon-class="hot" /><span style="margin: 8px">{{ (blog.ratingCount / 888).toFixed(0) }}</span>
          <svg-icon icon-class="view" /><span style="margin: 8px">{{ blog.readCount }}</span>
          <span style="cursor: pointer" @click="addLike">
            <svg-icon icon-class="like" /><span style="margin: 8px">{{ blog.likeCount }}</span>
          </span>
        </span>
      </div>
      <span class="text" v-html="blog.content" />
      <span class="text">源链接：<el-link :href="blog.originLink">{{ blog.originLink }}</el-link></span>
    </el-col>
    <el-col :span="6">
      <tip-item name="博主信息" />
      <author-detail-item :id="blog.blogId" :title="blog.author" url="本文博主" />
      <tip-item name="相关标签" />
      <div v-for="item in tagList" :key="item.id">
        <tag-item :id="item.id" :name="item.name" />
      </div>
      <tip-item name="相关博客" />
      <div v-for="item in similarList" :key="item.id">
        <blog-brief-item :id="item.id" :title="item.title" :author="item.author" :date="item.updateTime" />
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import AuthorDetailItem from '@/views/components/author-detail-item'
import { getArticle, getSimilarityArticle, likeArticle, readArticle } from '@/api/blog'
import BlogBriefItem from '@/views/components/blog-brief-item'
import TagItem from '@/views/components/tag-item'
export default {
  components: { TagItem, BlogBriefItem, AuthorDetailItem, TipItem },
  data() {
    return {
      id: this.$route.params.id,
      blog: {},
      similarList: [],
      tagList: []
    }
  },
  created() {
    this.updateInfo()
    readArticle(this.id)
  },
  methods: {
    updateInfo() {
      var that = this
      getArticle(that.id).then(response => {
        const { data } = response
        that.blog = data
        that.blog.content = '<html><head><style> img{ max-width: 100%; width:auto; height: auto; }</style></head><body>' + that.blog.content + '</body></html>'
        that.tagList = that.blog.tagList
      })
      getSimilarityArticle(that.id).then(response3 => {
        const { data } = response3
        that.similarList = data
      })
    },
    addLike() {
      var that = this
      likeArticle(that.blog.id).then(response => {
        that.updateInfo()
      })
    }
  }
}
</script>

<style scoped>
.title {
  color: #222222;
  line-height: 64px;
  font-size: 24px;
}
.tag {
  color: #888888;
  line-height: 44px;
  font-size: 14px;
  border-bottom: 1px solid #eeeeee;
  border-top: 1px solid #eeeeee;
}

.text {
  color: #222222;
  line-height: 32px;
  font-size: 15px;
}
</style>

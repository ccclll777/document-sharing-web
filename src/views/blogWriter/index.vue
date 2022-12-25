<template>
  <div style="margin: 8px">
    <el-col :span="13" style="margin-left: 8.3%">
      <div style="margin: 8px">
        <el-tabs>
          <el-tab-pane v-for="(tabItem,index) in list" :key="index" :label="tabItem[0].blog.title">
            <div v-for="item in tabItem" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :span="7">
      <div style="margin: 8px">
        <tip-item name="热门博主" />
        <div v-for="item in tagList" :key="item.id">
          <tag-item :id="item.id" :type="0" :name="item.title" tag="user" />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import BlogDetailItem from '@/views/components/blog-detail-item'
import { getArticleListByBlogger, getBloggerList } from '@/api/blog'
import TagItem from '@/views/components/tag-item'

export default {
  components: { TagItem, BlogDetailItem, TipItem },
  data() {
    return {
      list: [],
      tagList: []
    }
  },
  created() {
    this.fetchList()
  },
  methods: {
    fetchList() {
      var that = this
      getBloggerList(1, 20).then(response => {
        const { data } = response
        that.tagList = data
      })
      getBloggerList(1, 5).then(response => {
        const { data } = response
        for (var i in data) {
          getArticleListByBlogger(data[i].id, 1, 5).then(response2 => {
            const data2 = response2.data
            that.list.push(data2)
          })
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div style="margin: 8px">
    <el-col :span="13" style="margin-left: 8.3%">
      <div style="margin: 8px">
        <el-tabs>
          <el-tab-pane v-for="(tabItem,index) in list" :key="index" :label="tabItem.tag.name">
            <div v-for="item in tabItem.articleList" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
    <el-col :span="7">
      <div style="margin: 8px">
        <tip-item name="热门标签" />
        <div v-for="item in tagList" :key="item.id">
          <tag-item v-if="item.name !== '未知标签'" :id="item.id" :name="item.name" />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import BlogDetailItem from '@/views/components/blog-detail-item'
import { getArticleListByTag, getTagListByCount } from '@/api/blog'
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
      getTagListByCount(1, 20).then(response => {
        const { data } = response
        that.tagList = data
      })
      getTagListByCount(1, 9).then(response => {
        const { data } = response
        for (var i in data) {
          if (data[i].name !== '未知标签') {
            getArticleListByTag(data[i].id, 1, 9).then(response2 => {
              const data2 = response2.data
              that.list.push(data2)
            })
          }
        }
      })
    }
  }
}
</script>

<style scoped>

</style>

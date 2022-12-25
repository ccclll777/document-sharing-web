<template>
  <div style="margin: 8px">
    <el-col :span="13" style="margin-left: 8.3%">
      <div style="margin: 8px">
        <el-tabs>
          <el-tab-pane label="个性推荐">
            <div v-for="item in recommendList" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="我的订阅">
            <div v-for="item in subArticleList" :key="item.id">
              <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
            </div>
          </el-tab-pane>
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
        <tip-item name="我的数据" />
        <user-detail-item :name="userInfo.username" :description="userInfo.email" :sub="record.subCount" :like="record.likingCount" :read="record.browsingCount" />
        <el-row>
          <el-col :span="16">
            <tip-item name="博主和标签订阅" />
            <div v-for="(item,index) in subList" :key="index">
              <tag-item v-if="item.type === 1" :id="item.id" :type="item.type" :name="item.name" />
              <tag-item v-if="item.type === 0" :id="item.id" :type="item.type" :name="item.title" tag="user" />
            </div>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" style="margin: 8px; float: right">管理订阅</el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import BlogDetailItem from '@/views/components/blog-detail-item'
import UserDetailItem from '@/views/components/user-detail-item'
import { getDetailInfo, getRecord } from '@/api/user'
import { getArticleListBySubscription, getArticleListByTag, getArticlesByHisTag, getSubscriptionList } from '@/api/blog'
import TagItem from '@/views/components/tag-item'

export default {
  components: { TagItem, UserDetailItem, BlogDetailItem, TipItem },
  data() {
    return {
      userInfo: { username: '' },
      recommendList: [],
      list: [],
      subList: [],
      subArticleList: [],
      record: {}
    }
  },
  created() {
    this.fetchInfo()
    this.fetchList()
  },
  methods: {
    fetchInfo() {
      var that = this
      getDetailInfo().then(response => {
        const { data } = response
        that.userInfo.username = data.name
        that.userInfo.email = data.email
        getRecord().then(response2 => {
          const { data } = response2
          that.record = data
        })
      }).catch(error => {
        console.log(error)
      })
    },
    fetchList() {
      var that = this
      getArticlesByHisTag().then(response => {
        const { data } = response
        that.recommendList = data
      })
      getSubscriptionList().then(response => {
        const { data } = response
        that.subList = data
        for (var i in data) {
          if (data[i].type !== 0) {
            getArticleListByTag(data[i].id, 1, 10).then(response2 => {
              const data2 = response2.data
              that.list.push(data2)
            })
          }
        }
      })
      getArticleListBySubscription().then(response => {
        const { data } = response
        that.subArticleList = data
      })
    }
  }
}
</script>

<style scoped>

</style>

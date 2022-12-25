<template>
  <div style="margin: 8px">
    <el-col :span="20" style="margin-left: 8.3%">
      <el-row>
        <el-card class="author-item">
          <el-row>
            <el-col style="width: 80px">
              <el-image v-if="type==='origin'" class="author-pic" src="https://s1.ax1x.com/2020/06/16/NiMrZj.png" />
              <el-image v-if="type==='tag'" class="author-pic" src="https://s1.ax1x.com/2020/06/15/NCFLTg.png" />
            </el-col>
            <el-col style="width: auto">
              <div class="name">{{ tagItem.name }}</div>
              <el-tag v-if="type==='tag'" type="info" effect="plain" class="description">{{ tagItem.name }}</el-tag>
              <span v-for="(item,index) in descriptionList" :key="item">
                <el-tag v-if="index < 6 && item !=='\n'" type="info" effect="plain" class="description"># {{ item }}</el-tag>
              </span>
            </el-col>
            <el-col style="width: 100px; height: 50px; float: right">
              <el-button v-if="sub_status === false" type="primary" @click="addSub">+ 订阅</el-button>
              <el-button v-if="sub_status === true" type="info" @click="delSub">已订阅</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-row>
      <el-col :span="18">
        <div style="margin: 8px">
          <div v-for="item in articleList" :key="item.id">
            <blog-detail-item :id="item.id" :title="item.title" :text="item.summary" :date="item.updateTime" :author="item.author" :view="item.readCount" :like="item.likeCount" :category="item.category.name" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <el-col :span="8">
          <div class="number-text">博文数量</div>
          <div class="number">{{ tagItem.count }}</div>
        </el-col>
        <el-col :span="8">
          <div class="number-text">累计点赞</div>
          <div class="number">...</div>
        </el-col>
        <el-col :span="8">
          <div class="number-text">累计订阅</div>
          <div class="number">...</div>
        </el-col>
        <el-col :span="24">
          <tip-item name="相关标签" />
          <div v-for="item in tagList" :key="item.id">
            <tag-item v-if="item.name !== '未知标签'" :id="item.id" :name="item.name" />
          </div>
        </el-col>
      </el-col>
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import {
  addSubscription,
  delSubscription,
  getArticleListByBlogger,
  getArticleListByTag, getSubscriptionStatus,
  getTagListByCount
} from '@/api/blog'
import BlogDetailItem from '@/views/components/blog-detail-item'
import TagItem from '@/views/components/tag-item'
export default {
  components: { TagItem, BlogDetailItem, TipItem },
  data() {
    return {
      type: this.$route.params.type,
      tagItem: { id: this.$route.params.id, count: '...' },
      articleList: [],
      descriptionList: [],
      tagList: [],
      sub_status: false
    }
  },
  created() {
    var that = this
    if (this.type === 'tag') {
      getArticleListByTag(that.tagItem.id, 1, 20).then(response => {
        const { data } = response
        that.tagItem = data.tag
        that.tagItem.name = '# ' + that.tagItem.name
        that.articleList = data.articleList
        that.descriptionList = that.splitDescription(that.tagItem.description)
        getSubscriptionStatus(1, that.tagItem.id).then(response2 => {
          if (response2.data === 1) {
            that.sub_status = true
          }
        })
      })
      getTagListByCount(1, 10).then(response => {
        const { data } = response
        that.tagList = data
      })
    } else if (this.type === 'origin') {
      getArticleListByBlogger(that.tagItem.id, 1, 10).then(response => {
        const { data } = response
        that.articleList = data
        that.tagItem.name = that.articleList[0].author + ' —— ' + that.articleList[0].blog.title
        that.descriptionList[0] = that.articleList[0].blog.url
        getSubscriptionStatus(0, that.tagItem.id).then(response2 => {
          if (response2.data === 1) {
            that.sub_status = true
          }
        })
      })
      getTagListByCount(1, 10).then(response => {
        const { data } = response
        that.tagList = data
      })
    }
  },
  methods: {
    splitDescription(data) {
      return data.split('#')
    },
    addSub() {
      this.sub_status = true
      var that = this
      if (that.type === 'tag') {
        addSubscription(1, that.tagItem.id)
      } else if (that.type === 'origin') {
        addSubscription(0, that.tagItem.id)
      }
    },
    delSub() {
      this.sub_status = false
      var that = this
      if (that.type === 'tag') {
        delSubscription(1, that.tagItem.id)
      } else if (that.type === 'origin') {
        delSubscription(0, that.tagItem.id)
      }
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
    width: 64px;
    height: 64px;
    margin-top: 8px;
  }
  .name {
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

  .number-text {
    margin: 8px;
    font-size: 12px;
    line-height: 24px;
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

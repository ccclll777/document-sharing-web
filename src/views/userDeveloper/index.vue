<template>
  <div class="app-container">
    <el-col :span="9" style="margin-left: 4%">
      <tip-item name="基本信息" />
      <el-form v-model="basicInfo" label-width="80px" style="margin: 8px">
        <el-form-item label="博客名称"><el-input v-model="basicInfo.title" placeholder="请输入博客名称：如张三的博客" /></el-form-item>
        <el-form-item label="博客地址"><el-input v-model="basicInfo.url" placeholder="请输入博客地址：http://xxx.xxx" /></el-form-item>
        <el-form-item label="RSS地址"><el-input v-model="basicInfo.feed" placeholder="请输入RSS订阅链接：http://xxx.xxx/feed" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button v-if="!isDev" type="primary" size="medium" @click="firstAdd">提交</el-button>
            <el-button v-if="isDev" type="info" :loading="crawlLoading" size="medium" @click="startCrawl">抓取</el-button>
            <el-button v-if="isDev" type="primary" size="medium" @click="updateBlog">更新</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="13">
      <div id="user_blog_chart" style="margin: 8px; width: 100%; height: 300px" />
    </el-col>
    <el-col :span="22" style="margin-left: 4%">
      <tip-item name="详细内容" />
      <el-table
        v-loading="listLoading"
        :data="list"
        element-loading-text="正在加载..."
        stripe
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="id" width="120px" prop="id" />
        <el-table-column align="center" label="博文名称" prop="title" />
        <el-table-column align="center" label="更新时间" width="220px" prop="updateTime" />
        <el-table-column align="center" label="阅读数量" width="120px" prop="readCount" />
        <el-table-column align="center" label="点赞数量" width="120px" prop="likeCount" />
        <el-table-column align="center" label="选项" width="120px">
          <template slot-scope="scope">
            <el-button-group>
              <el-button type="primary" size="mini" icon="el-icon-view" @click="routeArticle(scope.row)">查看</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination :total="blogCount" :current-page.sync="currentPage" background layout="prev, pager, next" style="float: right; margin: 8px" @current-change="handleCurrentChange" />
    </el-col>
  </div>
</template>

<script>
import TipItem from '@/views/components/tip-item'
import echarts from 'echarts'
import {
  addUserBlog,
  getArticleChart,
  getArticleListByUserBlog,
  getUserBlog,
  getUserBlogCount,
  updateUserBlog, userAddCrawl
} from '@/api/user'

export default {
  components: { TipItem },
  data() {
    return {
      user_blog_chart: null,
      basicInfo: { id: 0, title: '', url: '', feed: '' },
      isDev: false,
      crawlLoading: false,
      list: [],
      listLoading: false,
      currentPage: 1,
      blogCount: 10
    }
  },
  mounted() {
    var that = this
    that.user_blog_chart = echarts.init(document.getElementById('user_blog_chart'))
  },
  created() {
    var that = this
    getUserBlog().then(response => {
      const { data } = response
      if (data !== -1) {
        that.basicInfo = data
        that.isDev = true
        that.handleCurrentChange()
        that.setChart()
      }
    })
  },
  methods: {
    handleCurrentChange() {
      var that = this
      that.listLoading = true
      getUserBlogCount().then(response => {
        const { data } = response
        that.blogCount = data
        getArticleListByUserBlog(that.currentPage, 10).then(response2 => {
          const { data } = response2
          that.list = data
          that.listLoading = false
        })
      })
    },
    routeArticle(res) {
      this.$router.push({ path: '/detail/blog/' + res.id })
    },
    setChart() {
      var that = this
      getArticleChart('ArticlePostStatistics').then(response => {
        const data1 = response.data
        var date1 = []
        var total1 = []
        for (var i in data1) {
          date1.push(data1[i].time)
          total1.push(data1[i].count)
        }
        getArticleChart('ArticleBrowsingCountStatistics').then(response2 => {
          const data2 = response2.data
          var total2 = []
          for (var i in data2) {
            total2.push(data2[i].count)
          }
          getArticleChart('ArticleLikingCountStatistics').then(response3 => {
            const data3 = response3.data
            var total3 = []
            for (var i in data3) {
              total3.push(data3[i].count)
            }
            var option = {
              title: {
                text: '最近趋势总览'
              },
              grid: {
                left: '2%',
                right: '2%',
                bottom: '2%',
                containLabel: true
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'cross'
                }
              },
              xAxis: {
                type: 'category',
                data: date1,
                axisLabel: {
                  rotate: 50
                }
              },
              yAxis: [
                { type: 'value' },
                { type: 'value' }
              ],
              legend: {
                data: ['累计博客', '浏览量', '点赞量']
              },
              series: [{
                name: '累计博客',
                data: total1,
                type: 'line',
                smooth: false,
                yAxisIndex: 1,
                label: {
                  show: true,
                  position: 'top'
                }
              }, {
                name: '浏览量',
                data: total2,
                type: 'bar',
                smooth: false,
                label: {
                  show: true,
                  position: 'top'
                }
              }, {
                name: '点赞量',
                data: total3,
                type: 'bar',
                smooth: false,
                label: {
                  show: true,
                  position: 'top'
                }
              }]
            }
            that.user_blog_chart.setOption(option)
          })
        })
      })
    },
    firstAdd() {w
      var that = this
      addUserBlog(that.basicInfo).then(response => {
        that.isDev = true
      })
    },
    updateBlog() {
      var that = this
      updateUserBlog(that.basicInfo).then(response => {
        that.isDev = true
      })
    },
    startCrawl() {
      var that = this
      that.crawlLoading = true
      userAddCrawl(that.basicInfo.id).then(response => {
        that.crawlLoading = false
      })
    }
  }
}
</script>

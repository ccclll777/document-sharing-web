<template>
  <div style="margin: 8px">
    <el-row>
      <el-col :span="15">
        <el-card style="margin: 8px">
          <div id="user_trend_dashboard" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card style="margin: 8px">
          <div style="height: 300px">
            <el-tag style="margin: 8px" effect="plain">阅读数据</el-tag>
            <div style="margin: 8px; font-size: 14px">累计已经订阅了 {{ user_record.subCount }} 个博客/标签，累计阅读了 {{ user_record.browsingCount }} 次文章，并且送出过 {{ user_record.likingCount }} 个赞。</div>
            <el-tag style="margin: 8px" effect="plain">阅读习惯</el-tag>
            <div style="margin: 8px; font-size: 14px">根据阅读历史发现，你最喜欢在<span style="color: #800000; font-weight: bold">{{ common_time }}</span>进行阅读。</div>
            <el-tag style="margin: 8px" effect="plain">阅读兴趣</el-tag>
            <div style="margin: 8px; font-size: 14px">你对<span v-for="(item,index) in tagList" :key="index"><span v-if="index < 5">{{ item }}、</span><span v-if="index === 5">{{ item }}</span></span>等方面的文章有特别大的兴趣。</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="10">
        <el-card style="margin: 8px">
          <div id="user_top_tag_cloud" style="width: 100%; height: 280px" />
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card style="margin: 8px">
          <div id="user_top_read_blog" style="width: 100%; height: 280px" />
        </el-card>
      </el-col>
      <el-col :span="7">
        <el-card style="margin: 8px">
          <div id="user_top_read_article" style="width: 100%; height: 280px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getUserStatistic, getUserStatisticArticle, getUserStatisticBlog, getUserStatisticTag } from '@/api/view'
import { getRecord } from '@/api/user'

require('echarts-wordcloud')
require('echarts/theme/roma')

export default {
  data() {
    return {
      user_trend_dashboard: null, // 总趋势
      user_top_read_article: null, // 最多浏览的博客，柱状图
      user_top_read_blog: null, // 最热门博主，折线图
      user_top_tag_cloud: null, // 词云 标签
      user_record: {},
      common_time: '',
      tagList: []
    }
  },
  mounted() {
    var that = this
    that.user_trend_dashboard = echarts.init(document.getElementById('user_trend_dashboard'), 'roma')
    that.user_top_read_article = echarts.init(document.getElementById('user_top_read_article'), 'roma')
    that.user_top_read_blog = echarts.init(document.getElementById('user_top_read_blog'), 'roma')
    that.user_top_tag_cloud = echarts.init(document.getElementById('user_top_tag_cloud'), 'roma')
    that.init_top_read_article()
    that.init_top_tag_cloud()
    that.init_top_read_blog()
    that.init_trend_dashboard()
    that.fetchRecord()
  },
  methods: {
    // ok
    init_top_tag_cloud() {
      var that = this
      getUserStatisticTag().then(response => {
        const { data } = response
        var list = []
        for (var i in data) {
          list.push({ 'name': data[i].tag.name, 'value': data[i].score })
          that.tagList.push(data[i].tag.name)
        }
        var option = {
          title: {
            text: '标签偏好'
          },
          tooltip: {
            show: true
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            shape: 'rectangle',
            sizeRange: [20, 60],
            width: 500,
            height: 300,
            textStyle: {
              normal: {
                color: function() {
                  return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                  ].join(',') + ')'
                }
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: list
          }]
        }
        that.user_top_tag_cloud.setOption(option)
      })
    },
    // ok
    init_top_read_article() {
      var that = this
      getUserStatisticArticle().then(response => {
        const { data } = response
        var title = []
        var count = []
        for (var i in data) {
          title.push(data[i].article.title)
          count.push(data[i].browsingCount)
        }
        var option = {
          title: {
            text: '最喜欢的文章'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: title.reverse()
          },
          series: [
            {
              name: '评分',
              type: 'bar',
              barWidth: 10,
              data: count.reverse(),
              color: '#27299a',
              label: {
                show: true,
                position: [0, '-16px'],
                formatter: function(a) {
                  let num = ''
                  let str = ''
                  num = '0' + (5 - a.dataIndex)
                  str = `${num}-${a.name}`
                  return str
                }
              },
              showBackground: true,
              backgroundStyle: {
                color: '#eeeeee'
              }
            }
          ]
        }
        that.user_top_read_article.setOption(option)
      })
    },
    // ok
    init_top_read_blog() {
      var that = this
      getUserStatisticBlog().then(response => {
        const { data } = response
        var title = []
        var count = []
        for (var i in data) {
          title.push(data[i].blog.title)
          count.push(data[i].score)
        }
        var option = {
          title: {
            text: '最喜欢的博客'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            show: false
          },
          yAxis: {
            type: 'category',
            axisLine: { show: false },
            axisLabel: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
            data: title.reverse()
          },
          series: [
            {
              name: '评分',
              type: 'bar',
              barWidth: 10,
              data: count.reverse(),
              color: '#27299a',
              label: {
                show: true,
                position: [0, '-16px'],
                formatter: function(a) {
                  let num = ''
                  let str = ''
                  num = '0' + (5 - a.dataIndex)
                  str = `${num}-${a.name}`
                  return str
                }
              },
              showBackground: true,
              backgroundStyle: {
                color: '#eeeeee'
              }
            }
          ]
        }
        that.user_top_read_blog.setOption(option)
      })
    },
    // ok
    init_trend_dashboard() {
      var that = this
      getUserStatistic().then(response => {
        const { data } = response
        that.common_time = data.readTime
        var date = []
        var count1 = []
        var count2 = []
        for (var i in data.userBrowsingCounts) {
          date.push(data.userLikingCounts[i].time)
          count1.push(data.userBrowsingCounts[i].count)
          count2.push(data.userLikingCounts[i].count)
        }
        var option = {
          title: {
            text: '最近趋势'
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
            data: date,
            axisLabel: {
              rotate: 30
            }
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: ['阅读量', '点赞量']
          },
          series: [{
            name: '阅读量',
            data: count1,
            type: 'line',
            smooth: false,
            label: {
              show: true,
              position: 'top'
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }, {
            name: '点赞量',
            data: count2,
            type: 'bar',
            areaStyle: {},
            smooth: false,
            label: {
              show: false
            },
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            }
          }]
        }
        that.user_trend_dashboard.setOption(option)
      })
    },
    // ok
    fetchRecord() {
      var that = this
      getRecord().then(response => {
        const { data } = response
        that.user_record = data
      })
    }
  }
}
</script>

<style scoped>

</style>

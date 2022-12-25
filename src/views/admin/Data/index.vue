<template>
  <div class="app-container" style="margin-left: 8%; width: 84%">
    <el-row>
      <el-col :span="15">
        <el-card style="margin: 8px">
          <div id="trend_dashboard" style="width: 100%; height: 350px" />
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card style="margin: 8px">
          <div id="top_tag_cloud" style="width: 100%; height: 350px" />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="top_read_blog" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="top_read_article" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="top_like_article" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="user_sex_chart" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="top_read_user" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card style="margin: 8px">
          <div id="top_like_user" style="width: 100%; height: 300px" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  getArticleBrowsingCountRecently,
  getArticleLikingCountRecently,
  getArticleRecently,
  getBlogArticleBrowsingCountRecently, getSexStatistic,
  getTagBrowsingCountRecently,
  getUserBrowsingCountRecently,
  getUserLikingCountRecently
} from '@/api/dashboard'

import echarts from 'echarts'

require('echarts-wordcloud')
require('echarts/theme/roma')

export default {
  data() {
    return {
      trend_dashboard: null, // 总趋势
      top_like_article: null, // 最多点赞的博客，柱状图
      top_read_article: null, // 最多浏览的博客，柱状图
      top_like_user: null, // 最多点赞的用户，散点图
      top_read_user: null, // 最多浏览的用户，散点图
      top_read_blog: null, // 最热门博主，折线图
      top_tag_cloud: null, // 词云 标签
      user_sex_chart: null
    }
  },
  mounted() {
    var that = this
    that.trend_dashboard = echarts.init(document.getElementById('trend_dashboard'), 'roma')
    that.top_like_article = echarts.init(document.getElementById('top_like_article'), 'roma')
    that.top_read_article = echarts.init(document.getElementById('top_read_article'), 'roma')
    that.top_tag_cloud = echarts.init(document.getElementById('top_tag_cloud'), 'roma')
    that.top_read_user = echarts.init(document.getElementById('top_read_user'), 'roma')
    that.top_like_user = echarts.init(document.getElementById('top_like_user'), 'roma')
    that.top_read_blog = echarts.init(document.getElementById('top_read_blog'), 'roma')
    that.user_sex_chart = echarts.init(document.getElementById('user_sex_chart'))
    that.init_chart()
  },
  methods: {
    init_chart() {
      this.init_top_read_article()
      this.init_top_like_article()
      this.init_top_tag_cloud()
      this.init_top_like_user()
      this.init_top_read_user()
      this.init_top_read_blog()
      this.init_trend_dashboard()
      this.init_user_sex_chart()
    },
    init_top_tag_cloud() {
      var that = this
      getTagBrowsingCountRecently().then(response => {
        const { data } = response
        var list = []
        for (var i in data) {
          list.push({ 'name': data[i].name, 'value': data[i].count })
        }
        var option = {
          title: {
            text: '热门标签'
          },
          tooltip: {
            show: true
          },
          series: [{
            type: 'wordCloud',
            gridSize: 1,
            shape: 'rectangle',
            sizeRange: [20, 60],
            width: 411,
            height: 350,
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
        that.top_tag_cloud.setOption(option)
      })
    },
    init_top_read_article() {
      var that = this
      getArticleBrowsingCountRecently().then(response => {
        const { data } = response
        var title = []
        var count = []
        for (var i in data) {
          title.push(data[i].article.title)
          count.push(data[i].browsingCount)
        }
        var option = {
          title: {
            text: '最热文章'
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
              name: '浏览量',
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
        that.top_read_article.setOption(option)
      })
    },
    init_top_like_article() {
      var that = this
      getArticleLikingCountRecently().then(response => {
        const { data } = response
        var title = []
        var count = []
        for (var i in data) {
          title.push(data[i].article.title)
          count.push(data[i].likingCount)
        }
        var option = {
          title: {
            text: '高赞文章'
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
              name: '点赞量',
              type: 'bar',
              barWidth: 10,
              data: count.reverse(),
              color: '#154367',
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
        that.top_like_article.setOption(option)
      })
    },
    init_top_like_user() {
      var that = this
      getUserLikingCountRecently().then(response => {
        const { data } = response
        var user = []
        var count = []
        for (var i in data) {
          user.push(data[i].name)
          count.push(data[i].count)
        }
        var option = {
          title: {
            text: '用户点赞数据'
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
            data: user,
            axisLabel: {
              rotate: 50
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '点赞量',
            data: count,
            type: 'effectScatter',
            color: '#16846e',
            label: {
              show: true,
              position: 'top'
            }
          }]
        }
        that.top_like_user.setOption(option)
      })
    },
    init_top_read_user() {
      var that = this
      getUserBrowsingCountRecently().then(response => {
        const { data } = response
        var user = []
        var count = []
        for (var i in data) {
          user.push(data[i].name)
          count.push(data[i].count)
        }
        var option = {
          title: {
            text: '用户浏览数据'
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
            data: user,
            axisLabel: {
              rotate: 50
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '浏览量',
            data: count,
            type: 'effectScatter',
            color: '#166a84',
            label: {
              show: true,
              position: 'top'
            }
          }]
        }
        that.top_read_user.setOption(option)
      })
    },
    init_top_read_blog() {
      var that = this
      getBlogArticleBrowsingCountRecently().then(response => {
        const { data } = response
        var user = []
        var count = []
        for (var i in data) {
          user.push(data[i].title)
          count.push(data[i].articleCount)
        }
        var option = {
          title: {
            text: '最热个人博客'
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
            boundaryGap: false,
            data: user,
            axisLabel: {
              rotate: 50
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '浏览量',
            data: count,
            type: 'line',
            areaStyle: {},
            smooth: false,
            color: '#845316',
            label: {
              show: true,
              position: 'top'
            }
          }]
        }
        that.top_read_blog.setOption(option)
      })
    },
    init_trend_dashboard() {
      var that = this
      getArticleRecently().then(response => {
        const { data } = response
        var date = []
        var count = []
        var total = []
        var tmp = 0
        for (var i in data) {
          date.push(data[i].time)
          count.push(data[i].count)
          tmp = tmp + data[i].count
          total.push(tmp)
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
            data: date,
            axisLabel: {
              rotate: 50
            }
          },
          yAxis: {
            type: 'value'
          },
          legend: {
            data: ['累计新增', '当日新增']
          },
          series: [{
            name: '累计新增',
            data: total,
            type: 'line',
            smooth: false,
            color: '#800000',
            label: {
              show: true,
              position: 'top'
            }
          }, {
            name: '当日新增',
            data: count,
            type: 'bar',
            areaStyle: {},
            smooth: false,
            color: '#008088',
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
        that.trend_dashboard.setOption(option)
      })
    },
    init_user_sex_chart() {
      var that = this
      getSexStatistic().then(response => {
        const { data } = response
        var total = data[0].count + data[1].count + data[2].count
        var option = ({
          title: [{
            text: '用户性别'
          },
          {
            text: '{name|总数' + '}\n{val|' + total + '}',
            top: 'center',
            left: 'center',
            textStyle: {
              rich: {
                name: {
                  fontSize: 12,
                  color: '#999999',
                  padding: [10, 0]
                },
                val: {
                  fontSize: 18,
                  color: '#000000'
                }
              }
            }
          }],
          grid: {
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          series: [{
            name: '用户性别',
            type: 'pie',
            radius: ['35%', '55%'],
            center: ['50%', '53%'],
            avoidLabelOverlap: true,
            label: {
              position: 'outer'
            },
            data: [
              { value: data[0].count, name: '男' },
              { value: data[1].count, name: '未知' },
              { value: data[2].count, name: '女' }
            ]
          }]
        })
        that.user_sex_chart.setOption(option)
      })
    }
  }
}

</script>

<style scoped>

</style>

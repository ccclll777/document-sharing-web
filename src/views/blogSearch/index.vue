<template>
  <div style="margin: 8px">
    <el-col :span="12" style="margin-left: 25%">
      <div style="margin: 8px">
        <el-row>
          <el-autocomplete v-model="search" :fetch-suggestions="querySearch" placeholder="请输入搜索内容" :trigger-on-focus="false" style="width: 100%">
            <el-button slot="append" icon="el-icon-search" @click="routeToSearch" />
          </el-autocomplete>
        </el-row>
        <div v-for="(item,index) in list" :key="index">
          <search-item :id="item.id" :title="item.title" :text="item.verbalContent" />
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import SearchItem from '@/views/components/search-item'
import { searchArticleList, searchAutoComplete } from '@/api/blog'
export default {
  components: { SearchItem },
  data() {
    return {
      search: '',
      list: []
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.query.word !== from.query.word && to.query.word !== null && to.query.word !== undefined) {
        this.search = to.query.word
        this.searchList()
      }
    }
  },
  created() {
    if (this.$route.query.word !== null && this.$route.query.word !== undefined) {
      this.search = this.$route.query.word
      this.searchList()
    }
  },
  methods: {
    routeToSearch() {
      this.$router.push({ path: '/blog/search?word=' + this.search })
    },
    searchList() {
      var that = this
      searchArticleList(that.search).then(response => {
        const { data } = response
        that.list = data
        for (var i in that.list) {
          that.list[i].title = that.list[i].title.replace(/<javayh>/g, '<span style="color: #B71C1C">')
          that.list[i].title = that.list[i].title.replace(/<\/javayh>/g, '</span>')
          that.list[i].verbalContent = that.list[i].verbalContent.replace(/<javayh>/g, '<span style="color: #B71C1C">')
          that.list[i].verbalContent = that.list[i].verbalContent.replace(/<\/javayh>/g, '</span>')
        }
      })
    },
    querySearch(queryString, callback) {
      searchAutoComplete(queryString).then(response => {
        const { data } = response
        var suggestList = []
        for (var i in data) {
          suggestList.push({ value: data[i] })
        }
        var results = queryString ? suggestList.filter(this.createFilter(queryString)) : suggestList
        // 调用 callback 返回建议列表的数据
        callback(results)
      })
    },
    createFilter(queryString) {
      return (tagItem) => {
        return (tagItem.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    }
  }
}
</script>

<style scoped>

</style>

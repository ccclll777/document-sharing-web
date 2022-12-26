<template>
  <div style="margin: 8px">
    <el-col :span="12" style="margin-left: 25%">
      <div style="margin: 8px">
        <el-row>
          <el-autocomplete v-model="keyWord" :fetch-suggestions="querySearch" placeholder="请输入搜索内容" :trigger-on-focus="false" style="width: 100%">
            <el-button slot="append" icon="el-icon-search" @click="routeToSearch" />
          </el-autocomplete>
        </el-row>

        <div class="page-container" v-show="list.length > 0 ">
          <div v-for="(item,index) in list" :key="index">
            <search-item :id="item.mongoFileId" :name="item.name" :description="item.description" />
          </div>
        </div>
        <div style="padding: 30px 10px; color: #555" v-show="list.length < 1">
          <span v-if="!loading">暂无内容，试试其他呢～</span>
          <span v-else>拼命查找中，请等待...</span>
        </div>
      </div>
    </el-col>
  </div>
</template>

<script>
import SearchItem from '@/views/components/search-item'
import {searchFileList,searchFileHint} from "@/api/files";
export default {
  components: { SearchItem },
  data() {
    return {
      keyWord: '',
      list: [],
      loading: true,
    }
  },
  watch: {
    '$route'(to, from) {
      if (to.query.word !== from.query.word && to.query.word !== null && to.query.word !== undefined) {
        this.keyWord = to.query.word
        this.searchList()
      }
    }
  },
  created() {
    if (this.$route.query.word !== null && this.$route.query.word !== undefined) {
      this.keyWord = this.$route.query.word
      this.searchList()
    }
  },
  methods: {
    routeToSearch() {
      this.$router.push({ path: '/blog/search?word=' + this.keyWord })
    },
    searchList() {
      searchFileList(this.keyWord).then(response => {
        this.loading = false;
        const { data } = response
        this.list = data
        for (var i in this.list) {
          // this.list[i].title = this.list[i].title.replace(/<javayh>/g, '<span style="color: #B71C1C">')
          // this.list[i].title = this.list[i].title.replace(/<\/javayh>/g, '</span>')
          this.list[i].description = this.list[i].description.replace(/<em>/g, '<span style="color: #B71C1C">')
          this.list[i].description = this.list[i].description.replace(/<\/em>/g, '</span>')
        }
      })
    },
    querySearch(queryString, callback) {
      searchFileHint(queryString).then(response => {
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

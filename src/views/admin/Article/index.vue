<template>
  <div class="app-container" style="margin-left: 8%; width: 84%">
    <el-row>
      <el-col :span="6" style="margin: 8px">
        <el-input v-model="searchItem" placeholder="请输入内容" size="small">
          <el-button slot="append" size="small" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" style="margin: 8px">
        <el-button type="plain" size="small" icon="el-icon-plus" @click="addBlog">添加博客</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="id" width="120%" sortable prop="id" />
      <el-table-column align="center" label="博文名称" prop="title" />
      <el-table-column align="center" label="博文作者" prop="author" />
      <el-table-column align="center" label="爬取时间" prop="crawlingTime" />
      <el-table-column align="center" label="更新时间" prop="updateTime" />
      <el-table-column align="center" label="阅读数量" width="120%" prop="readCount" />
      <el-table-column align="center" label="点赞数量" width="120%" prop="likeCount" />
      <el-table-column align="center" label="博客id" width="120%" prop="blogId" />
      <el-table-column align="center" label="选项" width="120%">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="blogCount" :current-page.sync="currentPage" background layout="prev, pager, next" style="float: right; margin: 8px" @current-change="handleCurrentChange" />
    <el-dialog :visible.sync="addFormVisible" title="添加博客">
      <el-form label-width="80px" style="margin: 8px">
        <el-form-item label="博文名称"><el-input v-model="addBlogInfo.title" placeholder="请输入博文名称：xxx" /></el-form-item>
        <el-form-item label="博文作者"><el-input v-model="addBlogInfo.author" placeholder="请输入博文作者：xxx" /></el-form-item>
        <el-form-item label="博客id"><el-input v-model="addBlogInfo.blogId" placeholder="请输入对应的博客id：xxx" /></el-form-item>
        <el-form-item label="源链接"><el-input v-model="addBlogInfo.originLink" placeholder="请输入文章源链接：http://xxx" /></el-form-item>
        <el-form-item label="爬取时间"><el-input v-model="addBlogInfo.crawlingTime" placeholder="请输入爬取时间：2000-01-01 00:00:00" /></el-form-item>
        <el-form-item label="更新时间"><el-input v-model="addBlogInfo.updateTime" placeholder="请输入更新时间：2000-01-01 00:00:00" /></el-form-item>
        <el-form-item label="博客摘要"><el-input v-model="addBlogInfo.summary" :autosize="{ minRows: 3, maxRows: 5}" type="textarea" placeholder="请输入博客摘要文字" /></el-form-item>
        <el-form-item label="纯文本博文"><el-input v-model="addBlogInfo.verbalContent" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入博客纯文本文字" /></el-form-item>
        <el-form-item label="HTML博文"><el-input v-model="addBlogInfo.content" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入博客HTML内容" /></el-form-item>
        <el-form-item label="阅读数量"><el-input v-model="addBlogInfo.readCount" placeholder="请输入阅读数量：如0" /></el-form-item>
        <el-form-item label="点赞数量"><el-input v-model="addBlogInfo.likeCount" placeholder="请输入点赞数量：如0" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="addFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmAdd">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormVisible" title="编辑博客">
      <el-form v-model="blogInfo" label-width="80px" style="margin: 8px">
        <el-form-item label="博文id" style="text-align: left">{{ blogInfo.id }}</el-form-item>
        <el-form-item label="博文名称"><el-input v-model="blogInfo.title" placeholder="请输入博文名称：xxx" /></el-form-item>
        <el-form-item label="博文作者"><el-input v-model="blogInfo.author" placeholder="请输入博文作者：xxx" /></el-form-item>
        <el-form-item label="博客id"><el-input v-model="blogInfo.blogId" placeholder="请输入对应的博客id：xxx" /></el-form-item>
        <el-form-item label="源链接"><el-input v-model="blogInfo.originLink" placeholder="请输入文章源链接：http://xxx" /></el-form-item>
        <el-form-item label="爬取时间"><el-input v-model="blogInfo.crawlingTime" placeholder="请输入爬取时间：2000-01-01 00:00:00" /></el-form-item>
        <el-form-item label="更新时间"><el-input v-model="blogInfo.updateTime" placeholder="请输入更新时间：2000-01-01 00:00:00" /></el-form-item>
        <el-form-item label="博客摘要"><el-input v-model="blogInfo.summary" :autosize="{ minRows: 3, maxRows: 5}" type="textarea" placeholder="请输入博客摘要文字" /></el-form-item>
        <el-form-item label="纯文本博文"><el-input v-model="blogInfo.verbalContent" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入博客纯文本文字" /></el-form-item>
        <el-form-item label="HTML博文"><el-input v-model="blogInfo.content" :autosize="{ minRows: 5, maxRows: 10}" type="textarea" placeholder="请输入博客HTML内容" /></el-form-item>
        <el-form-item label="阅读数量"><el-input v-model="blogInfo.readCount" placeholder="请输入阅读数量：如0" /></el-form-item>
        <el-form-item label="点赞数量"><el-input v-model="blogInfo.likeCount" placeholder="请输入点赞数量：如0" /></el-form-item>
        <el-form-item>
          <div style="float: right">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmEdit">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { adminDelArticle, adminGetArticleCount, adminGetArticleList, adminUpdateArticle } from '@/api/admin'

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      addFormVisible: false,
      currentPage: 1,
      blogCount: 10,
      searchItem: '',
      addBlogInfo: { author: '', originLink: '', updateTime: '', title: '', summary: '', content: '', verbalContent: '', readCount: 0, likeCount: 0, crawlingTime: '', blogId: 0 },
      blogInfo: { id: 0, author: '', originLink: '', updateTime: '', title: '', summary: '', content: '', verbalContent: '', readCount: 0, likeCount: 0, crawlingTime: '', blogId: 0 }
    }
  },
  created() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange() {
      var that = this
      that.listLoading = true
      adminGetArticleCount().then(response => {
        const { data } = response
        that.blogCount = data
        adminGetArticleList(that.currentPage, 10).then(response => {
          const { data } = response
          that.list = data
          that.listLoading = false
        })
      })
    },
    addBlog() {
      this.addFormVisible = true
    },
    confirmAdd() {
    },
    edit(res) {
      this.dialogFormVisible = true
      this.blogInfo = res
    },
    del(res) {
      this.blogInfo = res
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel()
      })
    },
    confirmEdit() {
      var that = this
      adminUpdateArticle(that.blogInfo.id, that.blogInfo).then(response => {
        that.dialogFormVisible = false
        that.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    },
    confirmDel() {
      var that = this
      adminDelArticle(that.blogInfo.id).then(response => {
        that.dialogFormVisible = false
        that.handleCurrentChange()
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

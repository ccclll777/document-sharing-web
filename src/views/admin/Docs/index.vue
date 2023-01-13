<template>
  <div class="app-container" style="margin-left: 2%; width: 95%">
<!--    <el-row>-->
<!--      <el-col :span="6" style="margin: 8px">-->
<!--        <el-input v-model="searchItem" placeholder="请输入内容" size="small">-->
<!--          <el-button slot="append" size="small" icon="el-icon-search" />-->
<!--        </el-input>-->
<!--      </el-col>-->
<!--      <el-col :span="4" style="margin: 8px">-->
<!--        <el-button type="plain" size="small" icon="el-icon-plus" @click="addBlog">添加博客</el-button>-->
<!--      </el-col>-->
<!--    </el-row>-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      stripe
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="id" width="50%" sortable prop="id" />
      <el-table-column align="center" label="文档名称" prop="name" width="200%" />
      <el-table-column align="center" label="后缀" prop="suffix" width="100%"/>
      <el-table-column align="center" label="文档大小" prop="size"   width="80%"/>
      <el-table-column prop="categoryName" align="center" label="文档分类"  width="100%">
        <template slot-scope="scope">
          <el-tag v style="margin-left: 5px" type="success">
            {{ scope.row.categoryName }}
          </el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="文档标签" prop="tagNames" />-->
      <el-table-column
          prop="tagNames"
          align="center"
          width="100%"
          label="标签">
        <template slot-scope="scope">
          <el-tag v-for="tagName in scope.row.tagNames" :key="tagName" style="margin-left: 5px" type="success">
            {{ tagName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" prop="userName" width="80%" />
      <el-table-column align="center" label="文档状态" prop="fileState"/>
      <el-table-column align="center" label="错误消息" prop="errorMessage" />
<!--      <el-table-column align="center" label="审查状态" prop="reviewState"/>-->
      <el-table-column align="center" label="选项" width="150%">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="fileCount" :current-page.sync="currentPage" background layout="prev, pager, next" style="float: right; margin: 8px" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import {getFileList, getFileCount, deleteFileCompletely} from "@/api/files";

export default {
  data() {
    return {
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      addFormVisible: false,
      currentPage: 1,
      fileCount: 10,
      searchItem: '',
      fileInfo : ""
    }
  },
  created() {
    this.handleCurrentChange()
  },
  methods: {
    handleCurrentChange() {
      this.listLoading = true
      getFileCount().then(response => {
        if (response.code === 200) {
          const { data } = response
          this.blogCount = data
          getFileList(this.currentPage, 10).then(response => {
            if (response.code === 200) {
              const { data } = response
              this.list = data
              this.listLoading = false
            } else {
              this.$message.info("错误：" + response.data)
            }
          })
        } else {
          this.$message.info("错误：" + response.data)
        }

      })
    },
    edit(res) {
      this.dialogFormVisible = true
      this.fileInfo = res
    },
    del(res) {
      this.fileInfo = res
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel()
      })
    },
    confirmEdit() {

    },
    confirmDel() {
      deleteFileCompletely(this.fileInfo.id).then(response => {
        if (response.code === 200) {
          this.dialogFormVisible = false
          this.$message.info(response.data)
          this.handleCurrentChange()
        } else {
          this.$message.error("错误：" + response.data)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

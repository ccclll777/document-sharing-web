<template>
  <div class="app-container" style="margin-left: 2%; width: 95%">
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
      <el-table-column align="center" label="文档名称" prop="name" width="400%" />
      <el-table-column align="center" label="后缀" prop="suffix" width="100%"/>
      <el-table-column align="center" label="文档大小" prop="size"   width="120%"/>
<!--      <el-table-column align="center" label="文档分类" prop="categoryName" />-->
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
      <el-table-column align="center" label="审查状态" prop="reviewState"/>
      <el-table-column align="center" label="选项" width="200%">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row)" />
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row)" />
            <el-button type="primary" size="mini" icon="el-icon-download" @click="download(scope.row)" />
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination :total="fileCount" :current-page.sync="currentPage" background layout="prev, pager, next" style="float: right; margin: 8px" @current-change="handleCurrentChange" />

    <!-- 修改文档分类-->
    <el-dialog title="修改文档分类" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="文档名称" >
          <el-input v-model="editForm.name" autocomplete="off" />
        </el-form-item>
          <el-select v-model="editForm.categoryId" clearable placeholder="请选择分类">
            <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        <el-form-item label="文档描述" >
          <el-input v-model="editForm.description" autocomplete="off" />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
import {getUserFileCount, getUserFileList, deleteFile, updateFileCategory, updateFile} from "@/api/files";
import {getBaseUrl} from "@/utils/request";
import {getCategoryList} from "@/api/category";

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
      categories:[],
      editForm :{}
    }
  },
  created() {
    this.handleCurrentChange()
    this.categoryList()
  },
  methods: {
    categoryList() {
      getCategoryList(1,1000).then(response => {
        if (response.code === 200) {
          this.categories = response.data
        } else {
          this.$message.info("错误：" + response.message)
        }

      })
    },
    handleCurrentChange() {
      this.listLoading = true
      getUserFileCount().then(response => {
        if (response.code === 200) {
          const { data } = response
          this.blogCount = data
          getUserFileList(this.currentPage, 10).then(response => {
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
      this.editForm = res
    },
    del(res) {
      this.fileInfo = res
      this.$confirm('此操作将删除文档, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confirmDel()
      })
    },
    download(res) {
      console.log("download",getBaseUrl())
      window.open(getBaseUrl() + "/files/view/" + res.mongoFileId, "_blank");
    },
    confirmEdit() {
      console.log(this.editForm)
      var params = {categoryId: this.editForm.categoryId,fileId : this.editForm.id,name:this.editForm.name, description:this.editForm.description}
      updateFile(params).then(response => {
            if (response.code === 200) {
              this.dialogFormVisible = false
              this.handleCurrentChange()
              this.$message.success(response.data)
            } else {
              this.$message.error("错误：" + response.data)
            }
      }).catch(error => {
        console.log(error)
      })
    },
    confirmDel() {
      deleteFile(this.fileInfo.id).then(response => {
        if (response.code === 200) {
          this.dialogFormVisible = false
          this.$message.success(response.data)
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

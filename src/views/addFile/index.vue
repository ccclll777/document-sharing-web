<template>
  <div class="main-container">
    <div class="upload-title">
      <span>上传文档</span>
    </div>
    <el-form ref="addForm" :model="addForm"  label-width="80px" style="margin-top: 50px">
    <el-row>
      <el-col :span="1">
        <span>*</span>
      </el-col>

      <el-col :span="12"  style="margin-left: 30px">
        <div class="upload-panel">
          <el-upload
              class="upload-demo"
              ref="upload"
              :http-request="uploadData"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="addForm.fileList"
              :auto-upload="false"
              :limit="1"
              accept=".xls,.xlsx,.doc,.docx,.pdf,.ppt,.pptx">
            <div style="padding: 5px; line-height: 45px;">
              <img :src="buttonSrc" width="68px" height="68px"/>
            </div>
            <div slot="tip" class="el-upload__tip">
              <p>支持Word/Excel/PPT/PDF，不超过100M</p>
            </div>
          </el-upload>
        </div>
      </el-col>
    </el-row>
    <el-row style="padding: 5px 0; margin-top: 30px;">
      <el-col :span="20" >
        <el-form-item label="描述" prop="description">
        <el-input
            type="textarea"
            :rows="2"
            style="margin-left: 9px"
            placeholder="请输入描述信息"
            v-model="addForm.description">
        </el-input>
        </el-form-item>
      </el-col>
    </el-row>

      <el-col :span="6">
        <el-form-item label="分类" prop="categoryId">
          <el-select v-model="addForm.categoryId" clearable placeholder="请选择分类">
            <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        &nbsp;<el-button size="mini" type="primary"  @click="handleOpenAddCategoryDraw">新增</el-button>
        </el-form-item>
      </el-col>

        <div class="upload-button" style="width: 180px; height: 45px; border: 2px solid #000;
                                    background: #FFF7D6;
box-shadow: 0px 0px 10px 0px rgba(129,100,0,0.3);
border-radius: 8px;
display: flex;
justify-content: center;
"
             @click="saveData">
          <div style="padding: 5px; line-height: 45px;">
            <img :src="buttonSrc" width="24px" height="28px"/>
          </div>
          <span
              style="line-height: 45px; color: #000; font-size: 16px; font-weight: 600;">点我上传文档</span>

        </div>

    </el-form>
    <!-- 添加分类抽屉 -->
    <el-drawer
        title="添加分类"
        :visible.sync="drawOptions.addVisible"
        direction="rtl">
      <el-form ref="addCategoryForm" :model="addCategoryForm" :rules="addCategoryRules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="addCategoryForm.name" style="width: 280px" size="small" type="text" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="addCategoryForm.description" style="width: 280px" size="small" type="text" />
        </el-form-item>
        <el-form-item>
          <el-button
              type="primary"
              :loading="drawOptions.addBtnLoading"
              @click="handleCategoryAdd">保存
          </el-button>
          <el-button @click="drawOptions.addVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

  </div>
</template>

<script>

export default {
  name: "DocUpload",
  data() {
    return {
      placeholder: "输入一些内容",
      buttonSrc: require("../../assets/source/folder.png"),
      addForm:{
        fileList:[],
        categoryId:"",
        description : ""
      },
      //提交文件列表(只用来展示)

      //存放上传文件的对象
      headerObj: {
        Authorization: localStorage.getItem("token")
      },
      categories: [],
      drawOptions: {
        addVisible: false,
        addBtnLoading: false,
      },
      addCategoryForm: {
        name: '',
        description: ''
      },
      addCategoryRules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
        description: [{ required: true, message: '请输入分类描述', trigger: 'blur' }]
      },
    }


  },
  created() {
    this.fetchCategoryData()
  },
  methods:{
    // 显示添加分类抽屉
    handleOpenAddCategoryDraw() {
      this.drawOptions.addVisible = true
      this.resetForm('addCategoryForm')
    },
    // 重置表单信息
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    // 添加标签事件
    handleCategoryAdd() {
      this.$refs.addCategoryForm.validate((valid) => {
        if (valid) {
          this.drawOptions.addTagBtnLoading = true
          var params = { 'name': this.addCategoryForm.name, 'description': this.addCategoryForm.description,userId :localStorage.getItem("id")}
          CategoryRequest.addCategory(params).then(
              response => {
                if (response.code === 200) {
                  this.$message.success(response.data)
                  this.fetchCategoryData()
                  this.addCategoryForm = {}
                } else {
                  this.$Message.info("错误：" + response.message)
                }
              }
          )
          this.drawOptions.addTagBtnLoading = false
        }
      })
    },
    // 获取分类数据
    fetchCategoryData() {
      var param = { 'pageNum': 1, 'pageSize': 1000 }
      CategoryRequest.getCategoryList(param).then(
          response => {
            if (response.code === 200) {
              this.categories = response.data
            } else {
              this.$Message.info("错误：" + response.message)
            }
          }
      )
    },
    uploadData(item){
      console.log("uploadData")
      console.log("categories",this.addForm)
      //存放文件对象
      var uploadFile = item.file;
      // var param = { 'file': uploadFile, 'categoryId': this.addForm.categoryId,"description":this.addForm.description }
      var param = { 'file': uploadFile }
      console.log("param",param)
      // const loading  = this.$loading({
      //   lock:true,
      //   text:"上传中...",
      //   spinner:"el-icon-loading",
      //   background:'#aaaaaa50'
      // });
      // var config = {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // };
      // FilesRequest.uploadFile(param).then(
      //     response => {
      //       if (response.code === 200) {
      //         this.$Message.info( response.data)
      //       } else {
      //         this.$Message.info("错误：" + response.message)
      //       }
      //
      //     }
      // )


    },
    saveData() {
      this.$refs.upload.submit();
    }, handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }

}
</script>

<style scoped lang="scss">

.main-container {
  padding: 30px;

  .upload-title {
    width: 96px;
    height: 33px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 33px;

    margin-bottom: 30px;
  }

  .upload-panel {
    width: 300px;
    height: 190px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 2px solid #000000;
    padding: 4px 0;

    &:hover {
      //background-color: #f1f2f3;
      border: 2px dashed #000000;
    }
  }

  .cate-dropdown {
    text-align: center;
    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #000000;
    //margin-left: 10px;

    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC, serif;
    font-weight: 500;
    color: #000000;
    line-height: 45px;
  }

  .search-input-top {

    width: 100%;
    height: 45px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 1px solid #000000;
    padding: 0 10px;
    //margin: 10px 0;

    display: flex;
    justify-content: flex-start;
    align-content: center;

    input {
      height: 43px;
      width: 100%;
      text-decoration: none;
      outline: none;
      border: none;
    }
  }

  .description-area {
    /deep/ .ivu-input {
      border: 1px solid #000000;
    }
  }

  .star-tag {
    padding-right: 10px;
    text-align: right;
    color: red;
  }
}

/deep/ .ivu-upload-drag {
  border: none;
}


</style>
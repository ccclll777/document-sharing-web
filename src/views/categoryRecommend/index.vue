<template>
  <div class="homepage">
    <div class="bottom-group">
        <div class="top-container">
          <div class="panel-title left-pane-title">
            <span>文档分类</span>
          </div>
          <div :class=" item.clicked ? 'tag-info' : 'tag-info-unchecked' "
               v-for="item in categories"
               @click="changeToCurrentTag(item.name, item.id)">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="file-thumb-1">
          <FileThumb class="file-thumb"
                     :flag="false"
                     :title="file.name"
                     :fileId="file.thumbId"
                     v-for="file in currentData.slice(0, 9)" :key="file.mongoFileId"
                     @click.native="openFile(file.mongoFileId)"
          ></FileThumb>
        </div>
        <div class="file-thumb-1 second-group">
          <FileThumb class="file-thumb"
                     :flag="false"
                     :title="file.name"
                     :fileId="file.thumbId"
                     v-for="file in currentData.slice(10, 19)" :key="file.mongoFileId"
                     @click.native="openFile(file.mongoFileId)"
          ></FileThumb>
        </div>
    </div>
  </div>
</template>

<script>

import {getFileListByCategoryId, getRecentFiles} from '@/api/statistics'
import FileThumb from "@/views/dashboard/FileThumb";
import {getCategoryList} from "@/api/category";


export default {
  name: "categoryRecommend",
  components: {
    FileThumb,
  },
  data() {
    return {
      imgSrc: require("../../assets/source/banner.png"),
      data: [],
      currentData: [],
      categories:[
        {
          id: 17,
          name:"默认分类",
          clicked:true
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getCategoryList(1,1000).then(response => {
        if (response.code === 200) {
          this.categories = response.data
          for (var i = 0; i < response.data.length; i++) {
            this.categories[i].clicked = false;
          }
          this.categories[0].clicked = true;
        } else {
          this.$message.info("错误：" + response.message)
        }

      })
      this.changeToCurrentTag(this.categories[0].name,this.categories[0].id)
    },

    /**
     * 切换到某一个标签上
     * @param name
     * @param tagId
     */
    changeToCurrentTag(name, categoryId) {
      this.currentData = []
      for (var i = 0; i < this.categories.length; i++) {
        if (this.categories[i].name === name && this.categories[i].id === categoryId){
          this.categories[i].clicked = true;
        } else {
          this.categories[i].clicked = false;
        }
      }
      if (categoryId === -1) {
        categoryId = 17
      }
      getFileListByCategoryId(1,20,categoryId).then(response => {
        if (response.code == 200) {
          const { data } = response
          this.currentData = data

        }
      })
    },
    openFile(id) {
      this.$router.push({ path: '/detail/file/' + id })

    }
  }
}
</script>

<style lang="scss" scoped>

.homepage {
  width: 100%;
  //height: 100vh;
  padding-bottom: 20px;

  .top-group {
    height: 340px;
    width: 100%;
    padding-bottom: 40px;
    z-index: -1;

    .user-zone {
      position: absolute;
      right: 40px;
      top: 20px;
      display: flex;
      justify-content: flex-start;
      padding: 0 10px;

      span {
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC, serif;
        font-weight: 400;
        color: #000000;
        padding-right: 10px;
      }

      .user-tag {
        height: 36px;
        width: 36px;
        border: 1px solid #000;
        border-radius: 36px;
        background-color: #ffffff;
      }

      &:hover {
        cursor: pointer;
        background-color: rgba(#fff, 0.2);
        border-radius: 8px;
      }
    }
  }

  .bottom-group {
    margin: auto;
    width: 1400px;
    height: 619px;
    box-shadow: 0 0 5px 0 rgba(64, 64, 64, 0.3);
    border-radius: 8px;

    .left-panel {
      height: 100%;
      width: 900px;
      float: left;
      padding: 0 0 0 0;
    }

    .right-panel {
      height: 100%;
      width: 300px;
      float: left;
      padding: 0 24px 0 40px;
    }

    .top-container {
      height: 110px;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .panel-title {
        span {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC, serif;
          font-weight: 600;
          color: #464646;
          line-height: 28px;
        }
      }

      .left-pane-title {
        margin-left: 24px;
      }

      .tag-info {
        height: 30px;
        background: #FACF36;
        border-radius: 15px;
        border: 1px solid #000000;
        padding: 0 10px;
        margin-left: 20px;
        line-height: 32px;
        color: #000000;

        span {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC, serif;
          font-weight: 400;
          line-height: 20px;
        }

        &:hover {
          cursor: pointer;
          background: #FFFAE4;
        }
      }

      .tag-info-unchecked {
        height: 30px;
        border-radius: 15px;
        border: 1px solid #AAAAAA;
        padding: 0 10px;
        margin-left: 20px;
        line-height: 32px;
        color: #AAAAAA;

        &:hover {
          cursor: pointer;
          background: #FACF36;
          border: 1px solid #000000;
          color: #000000;
        }

        span {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC, serif;
          font-weight: 400;
          line-height: 20px;
        }
      }
    }

    .file-thumb-1 {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      overflow: hidden;
      padding-left: 20px;

      .file-thumb {
        margin-right: 38px;
      }
    }

    .second-group {
      margin-top: 40px;
    }

  }
}

</style>
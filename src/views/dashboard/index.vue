<template>
  <div class="homepage">

    <div class="bottom-group">
      <div class="left-panel">
        <div class="top-container">
          <div class="panel-title left-pane-title">
            <span>全部文档</span>
          </div>
          <div :class=" item.clicked ? 'tag-info' : 'tag-info-unchecked' "
              v-for="item in data"
              @click="changeToCurrentTag(item.name, item.tagId)">
            <span>{{ item.name }}</span>
          </div>
        </div>
        <div class="file-thumb-1">
          <FileThumb class="file-thumb"
                    :flag="false"
                    :title="file.name"
                    :fileId="file.thumbId"
                    v-for="file in currentData.slice(0, 6)" :key="file.mongoFileId"
                    @click.native="openFile(file.mongoFileId)"
          ></FileThumb>
        </div>
        <div class="file-thumb-1 second-group">
          <FileThumb class="file-thumb"
                    :flag="false"
                    :title="file.name"
                    :fileId="file.thumbId"
                    v-for="file in currentData.slice(6, 12)" :key="file.mongoFileId"
                    @click.native="openFile(file.mongoFileId)"
          ></FileThumb>
        </div>
      </div>
      <div class="right-panel">
        <div class="top-container">
          <div class="panel-title"><span>最新文档 🔥</span></div>
        </div>
        <div class="hot-trend">
          <HotTrend></HotTrend>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HotTrend from '@/views/dashboard/HotTrend'
import { getRecentFiles } from '@/api/statistics'
import FileThumb from "@/views/dashboard/FileThumb";


export default {
  name: "index",
  components: {
    HotTrend,
    FileThumb,
  },
  data() {
    return {
      imgSrc: require("../../assets/source/banner.png"),
      data: {},
      currentData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getRecentFiles(1, 15).then(response => {
        const { data } = response
        this.data = data
        this.changeToCurrentTag(this.data[0].name, this.data[0].tagId)
      })
    },

    /**
     * 切换到某一个标签上
     * @param name
     * @param tagId
     */
    changeToCurrentTag(name, tagId) {
      this.currentData = []
      this.data.forEach(item => {
        if (item.name === name && item.tagId === tagId) {
          item.clicked = true
          this.currentData = item.fileList
        } else {
          item.clicked = false
        }
      })
    },
    openFile(id) {
      console.log("openFile:" +id)
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
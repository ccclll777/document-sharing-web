<template>
        <div >
            <div class="title-info">
              <el-row>
                <el-col :span="2"> <div class="doc-trim" style="text-align: center">
                  <img :src=" thumbId | imgSrc " alt="thumb"
                       style="width: 108px;max-height: 144px;border: 1px solid #dcdee2; border-radius: 2px">
                </div></el-col>
                <el-col :span="22">
                  <div class="doc-info">
                  <div class="doc-info-title">
                    {{ name }}
                  </div>
                  <div class="doc-info-tag">
                    <!--                      <el-tag type="success" v-for="item in tags" :index="item.index" >{{ item.name }}</el-tag>-->
                    <el-tag v-for="tagName in tags" :key="tagName" style="margin-left: 5px" type="success">
                      {{ tagName }}
                    </el-tag>
                  </div>
                  <div class="doc-info-detail">
                    {{ userName }} {{ createTime }}
                  </div>

                </div></el-col>
              </el-row>


            </div>
            <div class="doc-preview">
                <!--                <PdfView></PdfView>-->
                <component :is="component"
                           v-if="component"/>
            </div>
            <div class="doc-operation-body">
                <doc-operation/>
            </div>
            <div class="doc-comment">
                <comment-page/>
            </div>

        </div>
</template>

<script>
// import PdfView from "./PngView"
// import { BackendUrl } from '@/api/request'
// import DocRequest from "@/api/document"
import {searchFileDetail} from "@/api/files";
// import {parseTime} from "../../utils/index"

import DocOperation from "./docOperation"

import CommentPage from "./CommentPage"
import {parseTime} from "@/utils";
export default {
    data() {
        return {
            id: this.$route.params.id,
          name: "",
            userName: "",
            docId: "",
            tags: [],
            createTime: new Date(),
            thumbId: "",
            component: null,
            tagColor: ['orange', 'gold', 'lime', 'cyan', 'blue', 'geekblue', 'magenta']
        }
    },
    components: {
   DocOperation, CommentPage
    },
    mounted() {
        this.init()
    },
    filters: {
        imgSrc(value) {
            if (value === "" || value == null) {
                return require('@/assets/source/doc.png');
            } else {
                return  "http://localhost:18082/api/files/image/" + value;
            }
        }
    },
    methods: {
        init() {
          searchFileDetail(this.id).then(response => {
             if (response.code === 200) {
               this.name = response.data.name;
               this.userName = response.data.userName;
               this.thumbId = response.data.thumbId;
               var docTime = response.data.createTime;
               this.createTime = parseTime(new Date(docTime), '{y}年{m}月{d}日 {h}:{i}:{s}');
               this.tags = response.data['tagNames'];
               let name = response.data.name
               let suffix = name.split(".")[name.split('.').length - 1];
               switch (suffix) {
                 case 'pdf':
                   this.component = () => import('@/views/fileView/pdfView')
                   break
                 case 'png':
                 case 'jpg':
                 case 'jpeg':
                   this.component = () => import('@/views/fileView/PngView')
                   break
                 case 'html':
                 case 'txt':
                   this.component = () => import('@/views/fileView/HtmlView')
                   break
                 case 'docx':
                 case 'doc':
                   this.component = () => import('@/views/fileView/WordView')
                   break
                 case 'pptx':
                   this.component = () => import('@/views/fileView/PPTxView')
                   break
                 case 'xlsx':
                   this.component = () => import('@/views/fileView/excel')
                   break
                 default:
                   this.component = () => import('@/views/fileView/ErrorView')
                   break
               }
             }
          })
        },

        renderTags(tags) {
            tags.forEach((item, index) => {
                item['index'] = index;
                item['color'] = this.tagColor[parseInt(Math.random() * this.tagColor.length)];
            })
            return tags;
        }
    }

}
</script>

<style lang="scss" scoped>
.nav {
    background-color: #f4d057;
    width: 100%;
    height: 50px;
    //position: absolute;
    //left: 0;
    //top: 0;
}
.main-container {
    width: 900px;
    //height: 100vh;
    //background-color: yellowgreen;
    padding: 25px;
    margin-left: 40px;
    box-sizing: content-box;

    .title-info {
        height: 190px;
        width:auto;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
        padding: 36px;
        display: block;
      margin: 40px;

        .doc-trim {
            float: left;
            width: 40px;
            //background-color: lightblue;
            height: 60px;
            line-height: 40px;
            display: block;
        }

        .doc-info {
            display: block;
            width: calc(100% - 40px);
            float: left;
            padding: 0 10px;
            text-align: left;
            margin-left: 40px;

            .doc-info-title {
                font-size: 24px;
                font-family: PingFangSC-Semibold, PingFang SC;
                font-weight: 600;
                color: #000000;
                line-height: 33px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }

            .doc-info-tag {
              margin-top: 10px;
                height: 40px;
                line-height: 40px;
                display: flex;
                align-items: flex-start;
                padding-top: 8px;
            }

            .doc-info-detail {
              margin-top: 20px;
              margin-left: 10px;
                height: 40px;
                font-size: 14px;
                font-family: PingFangSC-Regular, PingFang SC;
                font-weight: 400;
                color: #000000;
                line-height: 20px;
            }

        }
    }

    .doc-preview {
        margin: 40px ;
        overflow-y: auto;
        height: 100vh;
        padding: 10px 0;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
    }

    .doc-operation-body {
      margin: 40px ;
        height: 200px;
        //line-height: 200px;
        text-align: center;
        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;
    }

    .doc-comment {
      margin: 40px ;

        background-color: #42b983;
        min-height: 120px;

        box-shadow: 0px 0px 5px 0px rgba(64, 64, 64, 0.3000);
        border-radius: 8px;
        background-color: #fffeff;

        padding: 36px 40px;
    }
}

</style>
<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <pull-to :top-load-method="refresh" @infinite-scroll="loadMore" :top-config="TOPCONFIG" :top-block-height="65">
      <ul class="content" ref="scrollContent">
        <grid>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2===0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite" @click="clickFavouvirtImg(item.src)">
                <x-icon type="ios-heart-outline" size="30"></x-icon>
              </div>
            </div>
          </grid-item>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2!==0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite" @click="clickFavouvirtImg(item.src)">
                <x-icon type="ios-heart" size="30"></x-icon>
              </div>
            </div>
          </grid-item>
        </grid>
      </ul>
      <div v-transfer-dom>
        <previewer :list="imgSrc" ref="previewer"></previewer>
      </div>
      <p style="text-align:center;">
        <inline-loading></inline-loading>
        <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中</span>
      </p>
    </pull-to>
  </div>

</template>


<script>
  import axios from 'axios'
  import {XImg, Grid, GridItem, InlineLoading, Previewer, TransferDom, XButton} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    directives: {
      TransferDom
    },
    created() {
      this.$nextTick(() => {
        this.loadPic()
        var wrapperHeight = this.$refs.scrollWrapper.clientHeight
        this.$refs.scrollContent.style.minHeight = wrapperHeight + 1 + 'px'
      })
    },
    data() {
      return {
        imgSrc: [],
        TOPCONFIG: {
          triggerDistance: 50,
          stayDistance: 40,
        },
        pageIndex: 1
      }
    },
    components: {
      XImg,
      Grid,
      GridItem,
      PullTo,
      InlineLoading,
      Previewer,
      TransferDom,
      XButton
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
      loadPic(loaded, isMore) {
        var _this = this
        if (isMore) {
          _this.pageIndex++
          let url = 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + _this.pageIndex
          axios.get(url)
            .then(function (response) {
              response.data.results.forEach(function (el, idx) {
                _this.imgSrc.push({src: el.url})
              })
              if (loaded) {
                loaded('done')
              }
            })
            .catch(function (error) {
              console.log(error)
              if (loaded) {
                loaded('fail')
              }
            })
        } else {
          _this.$nextTick(function () {
            axios.get('https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1')
              .then(function (response) {
                _this.imgSrc = []
                response.data.results.forEach(function (el, idx) {
                  _this.imgSrc.push({src: el.url})
                })
                if (loaded) {
                  loaded('done')
                }
              })
              .catch(function (error) {
                console.log(error)
                if (loaded) {
                  loaded('fail')
                }
              })
          })
        }
      },
      refresh(loaded) {
        this.loadPic(loaded)
      },
      loadMore(loaded) {
        this.loadPic(loaded, true)
      },
      clickFavouvirtImg(url,isFavourited){
        console.log(url)
      }
    }
  }

</script>
<style lang="scss" scoped>
  .scrollWrapper {
    height: 100%;
    overflow: hidden;
    .content {
      list-style: none;
      margin: 0;
      padding: 0;
      .weui-grid:active {
        background-color: transparent;
      }
      .pulldown-tip {
        height: 46px;
        margin-top: -46px;
      }
      .imgWrap{
        position: relative;
        .img-favourite{
          position: absolute;
          padding-top: 8px;
          padding-left: 8px;
          bottom: 0;
          right: 0;
        }
        .ximg-demo {
          width: 100%;
          height: 100%;
        }
        .vux-x-icon {
          fill: #F70968;
        }
      }
    }
  }

  .loading-bar {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
</style>

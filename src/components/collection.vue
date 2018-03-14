<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <pull-to :top-load-method="refresh" @infinite-scroll="loadMore" :top-config="TOPCONFIG" :top-block-height="65">
      <ul class="content" ref="scrollContent">
        <grid>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2===0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite blank" @click="clickFavouvirtImg($event,item.src)"
                   :class="{favourited:item.isFavourited}">
              </div>
            </div>
          </grid-item>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2!==0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite blank" @click="clickFavouvirtImg($event,item.src)"
                   :class="{favourited:item.isFavourited}">
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
        // this.loadPic()
        this.getCollection()
        var wrapperHeight = this.$refs.scrollWrapper.clientHeight
        this.$refs.scrollContent.style.minHeight = wrapperHeight + 1 + 'px'
      })
    },
    data() {
      return {
        imgSrc: [],
        userFavouritedItem: [],
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
      clickFavouvirtImg(url, isFavourited) {
        console.log(url)
      },
      getCollection() {
        this.$axios.get('/searchCollection', {
          params: {
            userId: 1
          }
        }).then((res) => {
          if (res.data.code == 200) {
            res.data.itemArr.forEach((e, i) => {
              let item = {
                h: 0,
                w: 0,
                msrc: e,
                src: e
              }
              this.imgSrc.push(item)
            })
          }
        })
      },
      watch: {
        imgSrc() {
          this.imgSrc.forEach((e, i) => {
            this.userFavouritedItem.forEach((ele, idx) => {
              if (e.src == ele) {
                e.isFavourited = true
              }
            })
          })
        },
        userFavouritedItem() {
          this.imgSrc.forEach((e, i) => {
            this.userFavouritedItem.forEach((ele, idx) => {
              if (e.src == ele) {
                e.isFavourited = true
              }
            })
          })
        }
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
      .imgWrap {
        position: relative;
        .img-favourite {
          height: 25px;
          width: 27px;
          position: absolute;
          padding-top: 8px;
          padding-left: 8px;
          bottom: 3px;
          right: 1px;
          &.favourited {
            background: url('/static/aixin.png') no-repeat;
            background-size: 100% 100%;
          }
          &.blank {
            background: url('/static/aixinBlank.png') no-repeat;
            background-size: 100% 100%;
          }
          &.favourited.blank {
            background: url('/static/aixin.png') no-repeat;
            background-size: 100% 100%;
          }
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

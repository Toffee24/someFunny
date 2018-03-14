<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <pull-to :top-load-method="refresh" :top-config="TOPCONFIG" :top-block-height="65">
      <ul class="content" ref="scrollContent" v-if="imgSrc.length">
        <grid>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2===0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite favourited" @click="clickFavouvirtImg($event,item.src)"></div>
            </div>
          </grid-item>
          <grid-item>
            <div v-for="(item,index) in imgSrc" v-if="index%2!==0" class="imgWrap">
              <img class="ximg-demo" v-lazy="item.src" @click="show(index)">
              <div class="img-favourite favourited" @click="clickFavouvirtImg($event,item.src)">
              </div>
            </div>
          </grid-item>
        </grid>
      </ul>
      <div v-if="!imgSrc.length" class="notFound">
        <img src="/static/notFound.png">
      </div>
      <div v-transfer-dom>
        <previewer :list="imgSrc" ref="previewer"></previewer>
      </div>
    </pull-to>
  </div>

</template>


<script>
  import axios from 'axios'
  import {Grid, GridItem, Previewer, TransferDom, XButton, XImg} from 'vux'
  import PullTo from 'vue-pull-to'

  export default {
    directives: {
      TransferDom
    },
    created() {
      this.$nextTick(() => {
        this.getCollection()
        var wrapperHeight = this.$refs.scrollWrapper.clientHeight
        this.$refs.scrollContent ? this.$refs.scrollContent.style.minHeight = wrapperHeight + 1 + 'px' : ''
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
      Previewer,
      TransferDom,
      XButton
    },
    methods: {
      show(index) {
        this.$refs.previewer.show(index)
      },
      refresh(loaded) {
        this.getCollection(loaded)
      },
      clickFavouvirtImg(e, url) {
        this.$axios.post('/addCollection', {
          imgUrl: url,
          userId: this.$store.state.userInfo['userId']
        }).then((res) => {
          if (res.data.code == 200) {
            if (res.data.type == 2) {
              //删除
              this.$vux.toast.text('取消收藏成功', 'middle')
              this.getCollection()
            }
          }
        })
      },
      getCollection(loaded) {
        this.$axios.get('/searchCollection', {
          params: {
            userId: this.$store.state.userInfo['userId']
          }
        }).then((res) => {
          this.imgSrc = []
          if (loaded) {
            loaded('done')
          }
          if (res.data.code == 200) {
            if (res.data.itemArr.length == 0) {
              this.$vux.toast.text('当前没有任何收藏哦', 'middle')
            }
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
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        if (!vm.$store.state.userInfo) {
          vm.$router.push({path: '/'})
        }
      })
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
      .weui-grid {
        padding: 5px 8px;
      }
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
    .notFound {
      text-align: center;
      margin-top: 45%;
    }
  }

  .loading-bar {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
</style>

<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <pull-to :top-load-method="refresh" @infinite-scroll="loadMore" :top-config="TOPCONFIG" :top-block-height="65">
      <ul class="content" ref="scrollContent">
        <grid>
          <grid-item>
            <img v-for="(item,index) in imgSrc" class="ximg-demo" v-lazy="item" v-if="index%2===0">
          </grid-item>
          <grid-item>
            <img v-for="(item,index) in imgSrc" class="ximg-demo" v-lazy="item" v-if="index%2!==0">
          </grid-item>
        </grid>
      </ul>
      <p style="text-align:center;">
        <inline-loading></inline-loading>
        <span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中</span>
      </p>
    </pull-to>
  </div>

</template>


<script>
  import axios from 'axios'
  import {XImg, Grid, GridItem, InlineLoading} from 'vux'
  import PullTo from 'vue-pull-to'
  export default{
    created(){
      this.$nextTick(() => {
        this.loadPic()
        var wrapperHeight = this.$refs.scrollWrapper.clientHeight
        this.$refs.scrollContent.style.minHeight = wrapperHeight + 1 + 'px'
      })
    },
    data(){
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
      InlineLoading
    },
    methods: {
      loadPic(loaded, isMore){
        var _this = this
        if (isMore) {
          _this.pageIndex++
          let url = 'https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/' + _this.pageIndex
          axios.get(url)
            .then(function (response) {
              response.data.results.forEach(function (el, idx) {
                _this.imgSrc.push(el.url)
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
                  _this.imgSrc.push(el.url)
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
      refresh(loaded){
        this.loadPic(loaded)
      },
      loadMore(loaded){
        this.loadPic(loaded, true)
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
      .pulldown-tip {
        height: 46px;
        margin-top: -46px;
      }
      .ximg-demo {
        width: 100%;
        height: 100%;
      }
    }
  }

  .loading-bar {
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
</style>
<!--http://gank.io/api/data/%E5%89%8D%E7%AB%AF/10/2-->

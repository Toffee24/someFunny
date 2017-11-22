<template>
  <div class="scrollWrapper" ref="scrollWrapper">
    <pull-to :top-load-method="refreshData">
      <ul class="content" ref="scrollContent">
        <li>
          <card v-for="(item,idx) in pageData" :key="idx">
            <img slot="header" class="titleImg" v-if="item.images" :src="item.images[0]">
            <div slot="content" class="card-padding">
              <a :href="item.url" target="_blank" class="descLink">
                <p class="desc">{{item.desc}}</p>
              </a>
              <p class="info">By {{item.who}}</p>  <!--{{item.publishedAt.split('T')[0]}} -->
            </div>
          </card>
        </li>
      </ul>
    </pull-to>
  </div>
</template>

<script>
  import axios from 'axios'
  import {Card} from 'vux'
  import PullTo from 'vue-pull-to'
  export default{
    created(){
      this.getRandomData()
    },
    data(){
      return {
        pageData: [],
      }
    },
    components: {
      Card,
      PullTo
    },
    methods: {
      getRandomData(loaded){
        axios.get('https://gank.io/api/random/data/%E6%8B%93%E5%B1%95%E8%B5%84%E6%BA%90/20')
          .then((response) => {
            this.pageData = response.data.results
            if (loaded) {
              loaded('done')
            }
          })
          .catch((error) => {
            console.log(error)
            if (loaded) {
              loaded('fail')
            }
          })
      },
      refreshData(loaded){
        this.getRandomData(loaded)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .scrollWrapper {
    height: 100%;
    overflow: hidden;
    .weui-panel.weui-panel_access:before {
      content: none;
    }
    .titleImg {
      width: 100%;
      height: 140px;
      overflow: hidden;
      display: block;
    }
    .card-padding {
      .descLink {
        text-decoration: none;
        .desc {
          color: #666;
          line-height: 1.3;
          padding: 10px;
        }
      }
      .info {
        text-align: right;
        color: #999;
        font-size: 12px;
        padding-right: 10px;
        padding-bottom: 10px;
      }
    }
  }
</style>

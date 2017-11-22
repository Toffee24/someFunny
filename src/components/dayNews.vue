<template>
  <div class="swiperWrapper" ref="swiperWrapper">
    <div class="swiper-pagination" slot="pagination"></div>
    <swiper :options="swiperOption" :not-next-tick="notNextTick" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="(item,idx) in newsData" :key="idx">
        <div :style="{height:clientHeight+'px'}" class="dayWrapper">
          <day :title="item.title" :content="item.content"></day>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState} from 'vuex'
  import 'swiper/dist/css/swiper.css'
  import day from './day.vue'
  // swiper options example:
  export default {
    name: 'dayNews',
    data() {
      return {
        TAB_NAME: ['今天', '昨天', '前天', '三天前', '四天前'],
        date: {},
        notNextTick: true,
        swiperOption: {
          // swiper options 所有的配置同swiper官方api配置
          direction: 'horizontal',
          grabCursor: true,
          setWrapperSize: true,
          autoHeight: true,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          observeParents: true,
          debugger: true,
          onTransitionStart: (swiper) => {
            console.log(swiper)
          },
          paginationBulletRender: (swiper, index, className) => {
            return `<div class="${className} swiper-pagination-bullet-custom">${this.TAB_NAME[index]}</div>`;
          },
          onSlideChangeStart: (swiper) => {
            let date = this.computedDate(swiper.activeIndex)
//            this.getDateData(date)
          },
        },
        wrapperHeight: '',
        newsData: [{}]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      ...mapState([
        'clientHeight'
      ])
    },
    mounted() {
      //初始化swiper容器高度
      this.$nextTick(() => {
        this.wrapperHeight = this.$refs.swiperWrapper.clientHeight
      })
      console.log('this is current swiper instance object', this.swiper)
//      this.swiper.slideTo(3, 1000, false)
    },
    created(){
      this.loadData()
    },
    methods: {
      loadData(){
        let newsNum = 5, page = 1
        let url = `https://gank.io/api/history/content/${newsNum}/${page}`
        axios.get(url)
          .then((response) => {
            this.newsData = response.data.results
          })

      },
      getDateData(date){
        let url = `https://gank.io/api/history/content/day/${date}`
        axios.get(url)
          .then((res) => {
            this.newsData = response.data.results
          })
          .catch((error) => {
            console.log(error)
          })
      },
      computedDate(n){
        let d = new Date();
        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if (day <= n) {
          if (mon > 1) {
            mon = mon - 1;
          }
          else {
            year = year - 1;
            mon = 12;
          }
        }
        d.setDate(d.getDate() - n);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "/" + (mon < 10 ? ('0' + mon) : mon) + "/" + (day < 10 ? ('0' + day) : day);
        return s;
      }
    },
    components: {
      day
    }
  }
</script>

<style lang="scss">
  .swiperWrapper {
    height: 100%;
    .swiper-pagination-bullets {
      display: flex;
      width: 100%;
      height: 44px;
      align-items: center;
      .swiper-pagination-bullet {
        flex: 1;
        height: auto;
        width: auto;
        background-color: transparent;
        &.swiper-pagination-bullet {
          background-color: transparent;
        }
      }
    }
    .dayWrapper {
      margin-top: 44px;
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }
  }

</style>

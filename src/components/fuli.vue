<template>
  <div>
    <div v-for="item in imgSrc" style="text-align:center;">
      <img :src="item.url" class="ximg-demo">
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import {XImg} from 'vux'
  export default{
    created(){
      var _this = this
      _this.$nextTick(function () {
        axios.get('https://gank.io/api/data/%E7%A6%8F%E5%88%A9/10/1')
          .then(function (response) {
              console.log(response.data.results)
            _this.imgSrc = response.data.results
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
    data(){
      return {
        imgSrc: [],
      }
    },
    components: {
      XImg
    },
    methods: {
      success (src, ele) {
        console.log('success load', src)
        const span = ele.parentNode.querySelector('span')
        ele.parentNode.removeChild(span)
      },
      error (src, ele, msg) {
        console.log('error load', msg, src)
        const span = ele.parentNode.querySelector('span')
        span.innerText = 'load error'
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ximg-demo {
    width: 100%;
    height: 100%;
  }


</style>
<!--http://gank.io/api/data/%E5%89%8D%E7%AB%AF/10/2-->

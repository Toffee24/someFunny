<template>
  <div class="day">
    <h1 class="title">{{title}}</h1>
    <div class="dayNewsItem" v-html="content">{{this.$store.state.clientHeight}}</div>
  </div>
</template>

<script>
  export default{
    props: [
      'title',
      'content'
    ]
  }
</script>

<style lang="scss">
  .day {
    padding: 10px 10px 80px 10px;
    .title {
      text-align: left;
      font-weight: 700;
      font-size: 16px;
      line-height: 32px;
      margin: 10px 0;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      white-space: normal !important;
      -webkit-line-clamp: 1;
    }
    .dayNewsItem {
      height: 100%;
      width: 100%;
      overflow: hidden;
      p {
        img {
          width: 100%;
        }
      }
      h3 {
        color: #000;
        text-align: left;
        padding: 10px 0;
        font-size: 16px;
        font-weight: 700;
      }
      ul {
        color: #000;
        text-align: left;
        font-size: 14px;
        font-weight: 400;
        li {
          line-height: 20px;
          padding: 5px 0;
          a {
            color: #7e8c8d;
            text-decoration: none;
          }
        }
      }
    }
  }
</style>

<template>
  <div class="mainView" ref="mainView">
    <drawer :show.sync='drawerVisibility' :drawer-style="{width: '200px',height:'100%'}" placement="left"
            show-mode="push">
      <div slot="drawer">
        <div class="menuHeader">
          <div style="">
            <blur :blur-amount=40 :url="logourl">
              <p class="center"><img :src="logourl" class="logo"></p>
              <p class="loginName">Toffee</p>
            </blur>
          </div>
        </div>
        <group class="navItemGroup">
          <cell-box align-items="center" @click.native="jumpItem" tag="fuli">
            <div class="menuItem">
              <img src="static/sandwitch.png" width="15" height="15" style="margin-right: 10px;">
              妹子图
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="dayNews">
            <div class="menuItem">
              <img src="static/orangeJuice.png" width="15" height="15" style="margin-right: 10px;">
              每日干货
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="random">
            <div class="menuItem">
              <img src="static/dingling.png" width="15" height="15" style="margin-right: 10px;">
              随便看看
            </div>
          </cell-box>
        </group>
      </div>
      <div slot="default">
        <div style="height:46px;">
          <x-header style="width:100%;position:fixed;left:0;top:0;z-index:100;height: 46px">
            <span>{{itemName}}</span>
            <x-icon slot="overwrite-left" type="navicon" size="35"
                    style="fill:#fff;position:relative;top:-8px;left:-3px;"
                    @click="drawerVisibility = !drawerVisibility"></x-icon>
          </x-header>
        </div>
        <div class="mainContent" ref="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
  import {Drawer, Group, Cell, CellBox, Card, Blur, XHeader, Sticky} from 'vux'
  //  import router from './router/index'
  export default {
    name: 'app',
    components: {
      Drawer,
      Group,
      Cell,
      CellBox,
      Card,
      Blur,
      XHeader,
      Sticky
    },
    created(){
      this.bodyScroll = function (event) {
        event.preventDefault()
        event.preventDefault()
      }
      this.$nextTick(() => {
        this.$refs.mainContent.style.height = document.body.clientHeight - 46 + 'px'
        this.$store.commit('clientHeight', document.body.clientHeight - 46)
      })
    },
    data(){
      return {
        drawerVisibility: false,
        logourl: 'static/538e17811a35288577499f0fce51b603_1.jpg',
        itemName: '福利'
      }
    },
    methods: {
      jumpItem(e) {
        let txt = e.currentTarget.children[0].innerText
        let tag = e.currentTarget.getAttribute('tag')
        this.itemName = txt
        this.drawerVisibility = false
        switch (tag) {
          case 'fuli':
            this.$router.push({path: 'fuli'})
            break
          case 'random':
            this.$router.push({path: 'random'})
            break
          case 'ios':
            this.$router.push({path: 'ios'})
            break
          case 'fe':
            this.$router.push({path: 'fe'})
            break
          case 'dayNews':
            this.$router.push({path: 'dayNews'})
            break
        }
      }
    },
    watch: {
      drawerVisibility: function (newVlue) {
        if (newVlue) {
          this.$refs.mainView.addEventListener('touchmove', this.bodyScroll, false)
        } else {
          this.$refs.mainView.removeEventListener('touchmove', this.bodyScroll, false)
        }
      }
    }
  }

</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  .mainView {
    height: 100%;
    width: 100%;
    .navItemGroup {
      .vux-no-group-title {
        margin-top: 0;
      }
      .menuItem {
        font-size: 15px;
        color: #313131;
      }
    }
  }

  .loginName {
    text-align: center;
    color: #f0f0f0;
    font-weight: bold;
    margin-top: 20px;
  }

  .center {
    text-align: center;
    padding-top: 20px;
    color: #fff;
    font-size: 18px;
    .logo {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid #ececec;
    }
  }
</style>

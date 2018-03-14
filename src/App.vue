<template>
  <div class="mainView" ref="mainView">
    <drawer :show.sync='drawerVisibility' :drawer-style="{width: '200px',height:'100%'}" placement="left"
            show-mode="push">
      <div slot="drawer">
        <div class="menuHeader">
          <div style="">
            <blur :blur-amount=40 :url="logourl">
              <p class="center"><img :src="logourl" class="logo"></p>
              <p class="loginName">{{userName}}</p>
              <p class="writers">by Toffee</p>
            </blur>
          </div>
        </div>
        <group class="navItemGroup">
          <cell-box align-items="center" @click.native="jumpItem" tag="collection"
                    v-if="isShowCollection">
            <div class="menuItem">
              <img src="static/collection.png" width="15" height="15" style="margin-right: 10px;">我的收藏
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="login" v-if="!isShowCollection">
            <div class="menuItem">
              <img src="static/candy.png" width="15" height="15" style="margin-right: 10px;">登陆/注册
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="fuli">
            <div class="menuItem">
              <img src="static/sandwitch.png" width="15" height="15" style="margin-right: 10px;">妹子图
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="dayNews">
            <div class="menuItem">
              <img src="static/orangeJuice.png" width="15" height="15" style="margin-right: 10px;">每日干货
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="random">
            <div class="menuItem">
              <img src="static/dingling.png" width="15" height="15" style="margin-right: 10px;">随便看看
            </div>
          </cell-box>
          <x-button class="loginOut" @click.native="logout" v-if="isShowLogOut">退出登录</x-button>
        </group>
      </div>
      <div slot="default">
        <div style="height:46px;">
          <x-header style="width:100%;position:fixed;left:0;top:0;z-index:100;height: 46px">
            <span>{{this.$store.state.itemName}}</span>
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
  import {Drawer, Group, Cell, CellBox, Card, Blur, XHeader, Sticky, XButton} from 'vux'
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
      Sticky,
      XButton
    },
    created() {
      this.bodyScroll = function (event) {
        event.preventDefault()
        event.preventDefault()
      }
      this.$nextTick(() => {
        this.$refs.mainContent.style.height = document.body.clientHeight - 46 + 'px'
        this.$store.commit('clientHeight', document.body.clientHeight - 46)
      })
    },
    data() {
      return {
        drawerVisibility: false,
        logourl: 'static/538e17811a35288577499f0fce51b603_1.jpg',
        itemName: this.$store.state.itemName
      }
    },
    computed: {
      isShowCollection() {
        return this.$store.state.userInfo ? true : false
      },
      userName() {
        return this.$store.state.userInfo ? this.$store.state.userInfo.userName : '未登陆'
      },
      isShowLogOut() {
        return this.$store.state.userInfo ? true : false
      }
    },
    methods: {
      jumpItem(e) {
        let txt = e.currentTarget.children[0].innerText
        this.itemName = txt
        this.$store.commit('itemName', txt)
        this.drawerVisibility = false
        switch (this.itemName) {
          case '我的收藏':
            this.$router.push({path: 'collection'})
            break
          case '登陆/注册':
            this.$router.push({path: 'login'})
            break
          case '妹子图':
            this.$router.push({path: 'fuli'})
            break
          case '随便看看':
            this.$router.push({path: 'random'})
            break
          case '每日干货':
            this.$router.push({path: 'dayNews'})
            break
        }
      },
      getPath() {
        //路由变化
        this.$store.commit('itemName', this.$router.currentRoute.name)
      },
      logout() {
        this.$store.commit('userInfo', null)
        this.$vux.alert.show({
          content: '您已退出登录'
        })
        this.$router.push({path: '/'})
      }
    },
    watch: {
      drawerVisibility(newVlue) {
        if (newVlue) {
          this.$refs.mainView.addEventListener('touchmove', this.bodyScroll, false)
        } else {
          this.$refs.mainView.removeEventListener('touchmove', this.bodyScroll, false)
        }
      },
      "$route": "getPath"
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
      .loginOut {
        margin-top: 150px;
        font-size: 16px;
      }
    }
  }

  .loginName {
    text-align: center;
    color: #f0f0f0;
    font-weight: bold;
    margin-top: 20px;
  }

  .writers {
    color: #2c2c2c;
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 7px;
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

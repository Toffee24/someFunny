<template>
  <div class="mainView">
    <drawer :show.sync='drawerVisibility' :drawer-style="{width: '200px'}" placement="left" show-mode="push">
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
              福利
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="android">
            <div class="menuItem">
              Android
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="ios">
            <div class="menuItem">
              IOS
            </div>
          </cell-box>
          <cell-box align-items="center" @click.native="jumpItem" tag="fe">
            <div class="menuItem">
              前端
            </div>
          </cell-box>
        </group>
      </div>
      <div solt="default">
        <sticky>
          <x-header>
            <span>{{itemName}}</span>
            <x-icon slot="overwrite-left" type="navicon" size="35"
                    style="fill:#fff;position:relative;top:-8px;left:-3px;"
                    @click="drawerVisibility = !drawerVisibility"></x-icon>
          </x-header>
        </sticky>
        <div class="mainContent">
          <router-view></router-view>
        </div>
      </div>
    </drawer>
  </div>
</template>

<script>
  import {Drawer, Group, Cell, CellBox, Card, Blur, XHeader, Sticky} from 'vux'

  import router from './router/index'
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
    data(){
      return {
        drawerVisibility: false,
        logourl: 'http://p1.sinaimg.cn/2497753672/180/89461402559761',
        itemName: '福利'
      }
    },
    methods: {
      jumpItem(e) {
        let txt = e.currentTarget.children[0].innerHTML
        let tag = e.currentTarget.getAttribute('tag')
        this.itemName = txt
        this.drawerVisibility = false
        switch (tag) {
          case 'fuli':
            router.push({path: 'fuli'})
            break
          case 'android':
            router.push({path: 'android'})
            break
          case 'ios':
            router.push({path: 'ios'})
            break
          case 'fe':
            router.push({path: 'fe'})
            break
        }
      }
    },
    watch: {
      drawerVisibility: function (newVlue) {
        if (newVlue) {
          document.addEventListener('touchmove', function(e) { e.preventDefault() }, false)
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

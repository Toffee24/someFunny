<template>
  <div>
    <transition name="fade">
      <div v-if="!isLogin" class="wrapper">
        <group title="注册页面">
          <x-input title="用户名" placeholder="请输入10位以内纯英文" ref="input01" required v-model="userName"></x-input>
          <x-input title="密码" type="password" placeholder="请输入6位数字" v-model="password" :min="6" :max="6"
                   required></x-input>
          <x-input title="请确认密码" v-model="password2" type="password" placeholder="请确认密码"
                   :equal-with="password"></x-input>
        </group>
        <x-button class="submit" type="primary" action-type="button" @click.native="register">注册</x-button>
        <p class="loginText" @click="changeLogin">已有账号？登陆>></p>
      </div>
    </transition>
    <transition name="fade">
      <div v-if="isLogin" class="wrapper">
        <group title="登陆页面">
          <x-input title="用户名" placeholder="请输入用户名" ref="input01" required v-model="userName"></x-input>
          <x-input title="密码" type="password" placeholder="请输入6位数字" v-model="password" :min="6" :max="6"
                   required></x-input>
        </group>
        <x-button class="submit" type="primary" action-type="button" @click.native="login">登陆</x-button>
        <p class="loginText" @click="changeLogin">没有账号？注册>></p>
      </div>
    </transition>
  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell} from 'vux'

  export default {
    name: "login",
    data() {
      return {
        userName: '',
        isLogin: false,
        password: '',
        password2: '',
      }
    },
    components: {
      XInput,
      XButton,
      Group,
      Cell
    },
    methods: {
      changeLogin() {
        this.isLogin = !this.isLogin
      },
      register() {
        let valid = true
        valid = this.validForm()
        if (this.password !== this.password2) {
          this.$vux.alert.show({
            content: '两次密码输入不一致'
          })
          return
        }
        if (!valid) {
          return
        }
        this.$axios.post('/register', {
          userName: this.userName,
          password: this.password
        }).then((res) => {
          if (res.data.code != 200) {
            this.$vux.alert.show({
              content: res.data.message
            })
          }
          this.$vux.alert.show({
            content: '注册成功'
          })
          this.isLogin = true
        })
      },
      login() {
        let valid = true
        valid = this.validForm(true)
        if (!valid) {
          return
        }
        this.$axios.post('/login', {
          userName: this.userName,
          password: this.password
        }).then((res) => {
          if (res.data.code != 200) {
            this.$vux.alert.show({
              content: res.data.message
            })
          }else{
            this.$vux.toast.text('登陆成功', 'middle')
            this.$store.commit('userInfo',res.data)
            this.$store.commit('itemName', '每日干货')
            this.$router.push({ path: '/dayNews' })
          }
        })
      },
      validForm(isLogin) {
        if (!this.userName || !this.password) {
          this.$vux.alert.show({
            content: '请输入完整信息'
          })
          return false
        }
        if (!isLogin) {
          if (!this.password2) {
            this.$vux.alert.show({
              content: '请输入完整信息'
            })
            return false
          }
        }
        if (!/^[a-zA-Z]{1,10}$/.test(this.userName)) {
          this.$vux.alert.show({
            content: '用户名格式不正确'
          })
          return false
        }
        if (!/^[1-9]{6}/.test(this.password)) {
          this.$vux.alert.show({
            content: '密码格式不正确'
          })
          return false
        }
        return true
      }
    }
  }
</script>

<style scoped lang="scss">
  .wrapper {
    position: absolute;
    top: 46px;
    width: 100%;
    .submit {
      margin-top: 50px;
      width: 85%;
    }
    .loginText {
      TEXT-ALIGN: right;
      margin-right: 15px;
      margin-top: 20px;
      font-size: 13px;
      color: rgb(127, 140, 141);
      text-decoration: underline
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }
</style>

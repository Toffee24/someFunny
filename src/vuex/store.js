/**
 * Created by 差钱吗 on 2017/11/14.
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    clientHeight: 0,
    userInfo:JSON.parse(window.sessionStorage.getItem('userInfo')),
    itemName:'每日干货'
  },
  mutations: {
    clientHeight (state, num) {
      state.clientHeight = num
    },
    userInfo(state,obj){
      state.userInfo = obj
      window.sessionStorage.setItem('userInfo',JSON.stringify(obj));
    },
    itemName(state,name){
      state.itemName = name
      window.sessionStorage.setItem('itemName',name);
    }
  }
})

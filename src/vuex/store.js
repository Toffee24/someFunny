/**
 * Created by 差钱吗 on 2017/11/14.
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    clientHeight: 0
  },
  mutations: {
    clientHeight (state, num) {
      state.clientHeight = num
    }
  }
})

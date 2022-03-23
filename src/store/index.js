import Vue from 'vue'
import Vuex from 'vuex'
// import auth from './auth'
// import common from './common';
import dashboard from './../modules/dashboard/_store';
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dashboard
  },
  state: {
    status: null
  }
})

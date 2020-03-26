import Vue from 'vue'
import Vuex from 'Vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:mutations,
  actions:actions,
  getters:getters
})

export default store
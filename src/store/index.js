import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations:{
    addCart(state,payload){
      console.log(state,payload)
      state.cartList.push(payload)
    }
  }
})

export default store
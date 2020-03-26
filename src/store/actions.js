import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'

export default {
  addToCart({state,commit},payload) {
    return new Promise((resolve,reject) => {
      let product = state.cartList.find(item => item.iid === payload.iid);
      if(product) {
        commit(ADD_COUNTER,product)
        resolve('添加了一个新的商品')
      } else {
        payload.count = 1;
        commit(ADD_TO_CART,payload)
        resolve('添加了商品的数量')
      }
    })
  }
}
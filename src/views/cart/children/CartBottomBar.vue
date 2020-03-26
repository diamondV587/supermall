<template>
  <div class="cart-bottom-bar">
    <div class="cart-bottom-check">
      <van-checkbox class="checked-all" @click="checkClick" v-model="checkedAll">
        全选
      </van-checkbox>
    </div>
    <div class="cart-bottom-price">
      合计：
      <span>{{totalPrice}}</span>
      元
    </div>
    <div class="cart-bottom-btn">
      <button>提交订单({{ checkedLength }})</button>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'CartBottomBar',
  data() { 
    return {
    }
  },
  computed:{
    ...mapGetters([
      'cartList'
    ]),
    checkedLength() {
      return this.cartList.filter(item => item.checked === true).length;
    },
    totalPrice() {
      console.log(this.cartList)
      return '¥' + this.cartList.filter(item => item.checked === true)
        .reduce((preValue,item) => {return preValue + item.price * item.count},0).toFixed(2);
    },
    checkedAll() {
      if(this.cartList.length === 0){
        return false;
      } else {
        return !this.cartList.find(item => item.checked === false)
      }
    }
  },
  methods:{
    checkClick() {
      console.log('----')
      if(this.checkedAll) {
        this.cartList.forEach(item => item.checked = false)
      }
      else {
        this.cartList.forEach(item => item.checked = true)
      }
    }
  }
 }
</script>

<style>
.cart-bottom-bar {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}

.cart-bottom-price {
  margin-left: 50px;
}

.cart-bottom-price span {
  color: red;
}

.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}

.cart-bottom-btn button:active {
  opacity: 0.8;
}
</style>
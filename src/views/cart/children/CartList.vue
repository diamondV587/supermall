<template>
  <div class="cart-list">
    <scroll class="scroll-height" ref="scroll">
      <!-- 循环部分 -->
      <cart-list-item v-for="(item, index) in cartList" :product="item" :key="index+item.title"/>
    </scroll>

    <!-- 底部订单栏 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll";

import CartListItem from './CartListItem'
import CartBottomBar from './CartBottomBar'
import {mapGetters} from 'vuex'

export default {
  name: "CartList",
  components: { Scroll,CartListItem,CartBottomBar },
  data() {
    return {
      checkedAll: false
    };
  },
  computed: {
    ...mapGetters([
      'cartList'
    ])
  },
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
}

.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>

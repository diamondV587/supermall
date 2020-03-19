<template>
  <div class="goods-list-box">
    <div class="goods-list">
      <!-- 循环部分 -->
      <goods-list-item v-for="item in goods" 
        :key="item.title" :good="item"></goods-list-item>
    </div>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsItem'
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components:{
    GoodsListItem
  },
  methods: {

  }
};
</script>

<style scoped>
  .goods-list-box {
    width: 100%;
  }

  .goods-list-box p {
    font-size: 15px;
    margin-top: 10px;
    padding-left: 10px;
  }

  .goods-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
</style>

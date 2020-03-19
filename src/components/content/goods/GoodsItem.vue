<template>
  <div class="goods-list-item">
    <div class="img">
      <img alt="" :src="good.show.img" />
    </div>
    <div class="goods-info">
      <p>{{ good.title }}</p>
      <span class="price">¥{{ Number(good.price).toFixed(2) }}</span>
      <span class="collect">{{ good.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  props:{
    good:Object
  },
  data() { 
    return {

    }
  }
 }
</script>

<style>
  .goods-list-item {
    width: 48%;
    margin-bottom: 10px;
    border: 1px solid #e0e0e0;
    padding-bottom: 10px;
    border-radius: 4px;
    overflow: hidden;
  }

  .goods-list-item .img{
    display: inline-block;
    height: 260px;
    margin-bottom: 6px;
  }

  .goods-list-item .img img{
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .goods-info {
    font-size: 14px;
    right: 0;
    bottom: 5px;
    left: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    margin-bottom: 3px;
    /*
      一行显示
     */
    /* white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all; */
    /*
      两行显示
    */
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;

    text-align: left;
  }

  .goods-info .price {
    margin-right: 30px;
    color: #ff5777;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    position: absolute;
    top: 0;
    left: -15px;
    width: 14px;
    height: 14px;
    content: "";
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
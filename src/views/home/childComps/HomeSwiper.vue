<template>
    <swiper>
      <swiper-item v-for='item in list' :key='item.title'>
        <img alt="" :src="item.image" />
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'HomeSwiper',
  props:{
    list:Array
  },
  components:{
    Swiper,
    SwiperItem
  },
  data() { 
    return {

    }
  }
 }
</script>

<style>
</style>
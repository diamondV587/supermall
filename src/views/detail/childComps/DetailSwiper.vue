<template>
    <swiper class="detail-swiper">
      <swiper-item v-for='(item,index) in list' :key='index' class="detail-swiper-item">
        <img alt="" :src="item" @load="imageLoad" />
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  props:{
    list:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() { 
    return {
      
    }
  },
  methods:{
    imageLoad() {

    }
  },
  components:{
    Swiper,
    SwiperItem
  }
 }
</script>

<style>
  .detail-swiper{
    height: 300px;
  }
</style>
<template>
    <swiper>
      <swiper-item v-for='item in list' :key='item.title'>
        <img alt="" :src="item.image" @load="imageLoad" />
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
      isLoad:false
    }
  },
  methods:{
    imageLoad() {
      if(this.isLoad) return
      this.$emit("swiperImageLoad")
      this.isLoad = true;
    }
  }
 }
</script>

<style>
</style>
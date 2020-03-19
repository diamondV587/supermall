<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {  
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
    })
  },
  methods:{
    scrollTop(x,y,time=300) {
      this.scroll.scrollTop(x,y,time)
    }
  }
 }
</script>

<style>
  .wrapper {
    width: 100%;
  }
</style>
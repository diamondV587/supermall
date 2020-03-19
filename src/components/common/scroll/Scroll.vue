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
  props:{
    probeType:{
      type:Number,
      dafault:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data() {  
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper,{
      probeType: this.probeType,
      pullUpLoad:this.pullUpLoad,
      click: true
    })

    this.scroll.on('scroll',(position) => {
      this.$emit('scrollPosition',position);
    })

    this.scroll.on('pullingUp',() =>{
      this.$emit('pullingUp')
    })
  },
  methods:{
    scrollTop(x,y,time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll.refresh();
    }
  }
 }
</script>

<style>
  .wrapper {
    width: 100%;
  }
</style>
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

    if(this.probeType ===2 || this.probeType === 3) {
      this.scroll.on('scroll',(position) => {
        this.$emit('scrollPosition',position);
      })
    }

    if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() =>{
        this.$emit('pullingUp')
      })
    }
  },
  methods:{
    scrollTop(x,y,time=300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  }
 }
</script>

<style>
  .wrapper {
    width: 100%;
  }
</style>
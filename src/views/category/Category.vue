<template>
  <div class="wrapper" ref="wrapper">
    <div class="category">
      <ul>
        <li v-for="item in 200" :key="item">分类列表{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Category',
  data() { 
    return {
      scroll:null
    }
  },
  mounted() {
    console.log(this.$refs.wrapper)
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.wrapper,{
        probeType:2,
        pullUpLoad:true
      })

      this.scroll.on('scroll',(e)=>{
        console.log(e)
      })

      this.scroll.on('pullingUp',()=>{
        console.log("上拉加载更多")
      })
    })
    
  }
 }
</script>
<style >
.wrapper{
  height: 550px;
  background-color:crimson;
  overflow: hidden;
}
.category{
/* 
  原生滚动 移动端卡顿  
  overflow-x: hidden;
  overflow-y: scroll; */
}
</style>
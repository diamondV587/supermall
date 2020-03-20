<template>
  <nav-bar>
    <div slot="left">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" :key="item" 
          class="title-item" :class="{active:currentIndex==index}" @click="tabClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: 'DetailNavBar',
  data() { 
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components:{
    NavBar
  },
  methods:{
    tabClick(index) {
      this.currentIndex = index;
    }
  }
 }
</script>

<style>
  .title{
    display: flex;
  }
  .title-item{
    flex:1;
    text-align: center;
  }
  .active{
    color: #f00;
  }
</style>
<template>
  <div class="home">
    <nav-bar class="home-div">
      <div slot="center" class="center">购物街</div>
    </nav-bar>

    <scroll class="scrollheight" ref="scrollview">
      <home-swiper :list='banners.list'/>
      <line-bar/>
      <home-recommend-view :recommend='recommends.list'/>
      <line-bar/>
      <home-feature-view/>
      <line-bar/>
      <tab-control class="tab-control" 
                  :tabControls="['流行','新款','精选']" 
                  @tabClick="tabClick" />
      <goods-list :goods="this.goods[currentType].list"></goods-list>

      <div v-for='item in 100' :key="item">{{item}}</div>
    </scroll>

    <back-top @click.native="backClick"></back-top>
  </div>
</template>

<script>
import LineBar from 'components/common/line/LineBar'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import BackTop from 'components/content/backTop/BackTop'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {HomeSwiper,HomeRecommendView,HomeFeatureView} from 'views/home/childComps'

import {getHomeMultidata} from 'network/home'
import {getHomeGoods} from 'network/home'

export default {
  name: 'Home',
  components: {
    LineBar,
    NavBar,
    Scroll,
    BackTop,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommendView,
    HomeFeatureView
  },
  data() { 
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop'
    }
  },
  computed:{
    getGoods() {
      return this.goods[this.currentType].list
    }
  },
  created:function(){
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods:{
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      // native 监听组件的原生点击事件
      console.log("回到顶部")
      console.log(this.$refs.scrollview)
      this.$refs.scrollview.scrollTop(0,0)
    },
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
      })
    }
  }
 }
</script>
<style>
.home {
  z-index: 9;
  position: relative;
}
.home-div {
  position:fixed;
  top: 0;
  width: 100%;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 10;
}
.center {
  text-align: center;
}
.scrollheight {
  position: absolute;
  top:44px;
  bottom: 71px;
  left: 0;
  right: 0;
}
</style>
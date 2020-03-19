<template>
  <div class="home">
    <nav-bar class="home-div">
      <div slot="center" class="center">购物街</div>
    </nav-bar>
    <scroll class="content">
      <home-swiper :list='banners.list'></home-swiper>
      <line-bar></line-bar>
      <home-recommend-view :recommend='recommends.list'></home-recommend-view>
      <line-bar></line-bar>
      <home-feature-view></home-feature-view>
      <line-bar></line-bar>
      <div class="m-tab-control">
        <tab-control :tabControls="tabControls" @tabClick="tabClick"></tab-control>
      </div>
      <goods-list :goods="this.goods[currentType].list"></goods-list>

      <div v-for='item in 100' :key="item">{{item}}</div>
    </scroll>
  </div>
</template>

<script>
import LineBar from 'components/common/line/LineBar'
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

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
      tabControls:['流行','新款','精选'],
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
  margin-top: 44px;
  z-index: 9;
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
.m-tab-control {
  position: sticky;
  top: 44px;
  width: 100%;
  z-index: 10;
}
</style>
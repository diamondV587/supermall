<template>
  <div class="home">
    <nav-bar class="home-div">
      <div slot="center" class="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control fixed" 
                :tabControls="['流行','新款','精选']" 
                @tabClick="tabClick"
                ref='tabControl1' 
                v-show="isTabFixed" />
    <scroll class="scrollheight" ref="scroll"
            :probe-type="3"
            @scrollPosition="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :list='banners.list' @swiperImageLoad="swiperImageLoad"/>
      <line-bar/>
      <home-recommend-view :recommend='recommends.list'/>
      <line-bar/>
      <home-feature-view/>
      <line-bar/>
      <tab-control class="tab-control" 
                  :tabControls="['流行','新款','精选']" 
                  @tabClick="tabClick"
                  ref='tabControl2' 
                  v-show="!isTabFixed"/>
      <goods-list :goods="getGoods"></goods-list>
    </scroll>
    <line-bar/>
    <back-top @click.native="backClick" v-show="showBackTop" />
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
import {debounce} from 'common/utils'
import {itemLisenerMixin,BackUpToTop} from 'common/mixin'
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
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      showGoods:[],
      currentType:'pop',
      
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    getGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  // mounted() {
  //   const refresh = debounce(this.$refs.scroll.refresh,200)
  //   this.itemImageListener = refresh();
  //   this.$bus.$on('itemImageLoad',()=>{
  //     this.itemImageListener
  //   })
  // },
  mixins:[itemLisenerMixin,BackUpToTop],
  methods:{
    // 事件监听动作
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

      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },

    contentScroll(position){
      //backup 是否显示
      this.showBackTop = Math.abs(position.y) > 300;
      //
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    // 数据加载部分
    getHomeMultidata() {
      getHomeMultidata().then(res=>{
        this.banners = res.data.banner;
        this.recommends = res.data.recommend;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page+1;
      getHomeGoods(type,page).then(res=>{
        this.$nextTick(()=>{
          this.goods[type].list.push(...res.data.list)
        })
        this.goods[type].page += 1

        this.$refs.scroll.finishPullUp()
      })
    }
  },
  destoryed() {
    console.log("home destroyed")
  },
  // keep-alive 下才能使用的
  activated() {
    this.$refs.scroll.scrollTop(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()

    //去掉全局事件的监听
    this.$bus.$off('itemImgLoad',this.itemImageListener)
  }
 }
</script>
<style>
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
  overflow: hidden;
  top:44px;
  bottom: 59px;
  left: 0;
  right: 0;
}
.fixed{
  position: fixed;
  top:43px;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
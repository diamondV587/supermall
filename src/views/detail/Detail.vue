<template>
  <div class="detail-wrapper">
    <detail-nav-bar class="detail-nav" @titleClick='titleClick' ref='detailNavBar'/>
    <scroll class="detail-scroll" :probe-type="3" ref="scroll" @scrollPosition='contentScroll'>
      <detail-swiper :list='topImages' />
      <detail-base-info :goods='goods' />
      <detail-shop-info :shop='shops'/>
      <detail-images-info :images-info='detailsInfo' @imgLoad='imgLoad'/>
      <detail-param-info :param-info="paramsInfo" ref='params' class="detail-set-scroll" />
      <detail-comment-info :comment-info="commentInfo" ref='comment' class="detail-set-scroll" />
      <goods-list :goods="recommendList" ref='recommond'></goods-list>
    </scroll>

    <detail-bottom-bar  @addCart="addCart" />
    <back-top @click.native="backClick" v-show="showBackTop" />
  </div>  
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'

import {
  DetailNavBar,
  DetailSwiper,
  DetailBaseInfo,
  DetailShopInfo,
  DetailCommentInfo,
  DetailImagesInfo,
  DetailBottomBar,
  DetailParamInfo
} from './childComps'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail,getRecommoned,GoodsInfo,Shop,GoodsParams} from 'network/detail'
import {debounce} from 'common/utils'
import {itemLisenerMixin,BackUpToTop} from 'common/mixin'

import {mapActions} from 'vuex'

export default {
  name: 'Detail',
  data() { 
    return {
      iid:null,
      topImages:[],
      goods:{},
      shops:{},
      detailsInfo:{},
      goodsparams:{},
      paramsInfo:{},
      commentInfo:{},
      recommendList:[],
      themeTopYs:[],
      getThemeTopYs:null
    }
  },
  created() {
    this.iid = this.$route.params.iid
    getDetail(this.iid)
    .then(res=>{
      console.log(res)
      const data = res.result
      this.topImages = res.result.itemInfo.topImages

      this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
      this.shops = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo

      // 获取下面的图片展示数据
      this.detailsInfo = data.detailInfo;

      // 获取尺寸数据
      this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule || {});

      // 获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }
  /*
      this.$nextTick(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
        this.themeTopYs.push(this.$refs.recommond.$el.offsetTop-44)
      })
      */
    })

    getRecommoned().then(res=>{
      console.log(res)
      this.recommendList = res.data.list
    })

    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44)
      this.themeTopYs.push(this.$refs.recommond.$el.offsetTop-44)
      this.themeTopYs.push(Number.MAX_VALUE)    
    })
  },
  mixins:[itemLisenerMixin,BackUpToTop],
  methods:{
    ...mapActions([
      'addToCart'
    ]),
    imgLoad() {
      this.newRefresh()

      this.getThemeTopYs();

      console.log(this.themeTopYs)
    },
    titleClick(index) {
      console.log(index)
      this.$refs.scroll.scrollTop(0,-this.themeTopYs[index],100);
    },
    contentScroll(position) {

      const positionY = - position.y
      let length = this.themeTopYs.length
      for(let i =0;i<length-1;i++) {

        if(positionY>this.themeTopYs[parseInt(i)] &&  positionY < this.themeTopYs[parseInt(i)+1]) {
          this.$refs.detailNavBar.currentIndex = i;
        }
        // if(i < length -1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]
        //  || (i === length-1 &&positionY>this.themeTopYs[i])){
        //    console.log(i)
        //    this.$refs.detailNavBar.currentIndex = i;
        //  }

      }

      this.showBackTop = Math.abs(position.y) > 300;
    },
    addCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.nowPrice
      product.iid = this.iid
      // this.$store.dispatch('addToCart',product).then(res=>{
      //   console.log(res)
      // })
      this.addToCart(product).then(res=>{
        console.log(res);

        this.$toast.show(res);
      })
    }
  },
  destoryed(){
    this.$bus.$off('itemImageLoad',this.itemImageListener)
  }, 
  components:{
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailCommentInfo,
    DetailImagesInfo,
    DetailBottomBar,
    DetailParamInfo,
    GoodsList
  }
 }
</script>

<style>
  .detail-wrapper{
    position: relative;
    width: 100%;
    z-index: 10;
    height: 100vh;
    background-color: #fff;
  }
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 11;
  }
  .detail-scroll{
    height: calc(100% - 44px);
  }
</style>
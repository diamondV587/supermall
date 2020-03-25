import {debounce} from 'common/utils'

export const itemLisenerMixin = {
  data() {
    return {
      itemImageListener:null,
      newRefresh:null
    }
  },
  mounted() {
    this.newRefresh = debounce(this.$refs.scroll.refresh,100)

    this.itemImageListener = () => {
      this.newRefresh();
    }

    this.$bus.$on('itemImageLoad',this.itemImageListener)

    console.log("mixin content")
  }
}

import BackTop from 'components/content/backTop/BackTop'
export const BackUpToTop = {
  components:{
    BackTop
  },
  data() {
    return {
      showBackTop:false,
    }
  },
  methods:{
    backClick() {
      // native 监听组件的原生点击事件
      this.$refs.scroll.scrollTop(0,0)
    },
  }
}
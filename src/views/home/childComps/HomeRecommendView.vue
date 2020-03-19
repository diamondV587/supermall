<template>
  <div class="m-recommond">
    <div class="recommend">
      <div v-for='item in recommend' :key='item.title' class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" :alt="item.title" class="logo" />
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendView',
  props:{
    recommend:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() { 
    return {

    }
  }
 }
</script>
<style>
/*
  1.Positioning Model 布局方式、位置，相关属性包括：position, top, z-index, display, float等
  2.Box Model 盒模型，相关属性包括：width, height, padding, margin，border,overflow
  3.Typographic 文本排版，相关属性包括：font, line-height, text-align
  4.Visual 视觉外观，相关属性包括：color, background, list-style, transform, animation
*/
.recommend{
  display: flex;
  width: 100%;
  padding: 8px 0;
}
.recommend-item{
  flex: 1;
  text-align: center;
}
.recommend-item .logo{
  width: 64px;
  height: 64px;
}
</style>
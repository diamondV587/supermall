<template>
  <div class="tab-control">
    <div class="tab-control-item" 
      v-for='(item,index) in tabControls' 
      :key='item'
      :class="{active:index === currentIndex}"
      @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props:{
    tabControls:{
      type:Array,
      default() {
        return []
      }
    }
  },
  data() { 
    return {
      currentIndex:0
    }
  },
  methods:{
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    }
  }
 }
</script>

<style>
  .tab-control {
    line-height: 40px;
    display: flex;
    justify-content: space-between;
    height: 40px;
    text-align: center;
  }

  .tab-control-item {
    flex: 1;
  }
  .tab-control-item.active {
    color: var(--color-high-text);
  }
  .tab-control-item.active span{
    padding: 4px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
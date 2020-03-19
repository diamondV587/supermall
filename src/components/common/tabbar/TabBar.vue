<template>
  <div class="tab-bar">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
 }
</script>

<style>
  .tab-bar {
      position: fixed;
      padding: 6px 0;
      bottom: 0;
      background-color: #ececec;
      border-top:1px solid #eee;
      box-shadow: 0 -1px 1px rgba(150,150,150,.08);
      display: flex;
      width: 100%;
      z-index: 10;
  }

</style>
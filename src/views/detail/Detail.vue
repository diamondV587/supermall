<template>
  <div class="detail-wrapper">
    <detail-nav-bar></detail-nav-bar>
    {{iid}}
  </div>  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'

export default {
  name: 'Detail',
  data() { 
    return {
      iid:null
    }
  },
  created() {
    this.iid = this.$route.params.iid
  },
  components:{
    DetailNavBar
  }
 }
</script>

<style>
  .detail-wrapper{
    width: 100%;
  }
</style>
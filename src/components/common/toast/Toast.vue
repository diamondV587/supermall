<template>
  <div class="toast" v-show="showToast">
      {{message}}
  </div>
</template>

<script>
export default {
  name: 'Totast',
  data() { 
    return {
      message:'',
      showToast:false
    }
  },
  methods:{
    show(message,delay=2000) {
      let timer = null;
      if(timer) clearTimeout(timer)

      this.showToast = true;
      this.message = message

      timer = setTimeout(()=>{
        this.showToast = false;
        this.message = '';
      },delay)
    }
  }
 }
</script>

<style>
  .toast {
    font-size: 16px;
    position: fixed;
    z-index: 1000;
    top: 50%;
    left: 50%;
    margin: auto;
    padding: 8px 15px;
    transform: translate(-50%, -50%);
    color: white;
    background-color: rgba(0, 0, 0, 0.75);
  }
</style>
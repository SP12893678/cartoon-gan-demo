<template>
  <div>
      <snackBar />
      <router-view />
  </div>
</template>

<script>
import snackBar from './components/SnackBar.vue'

export default {
  components:{
    snackBar
  }
}
</script>

<style>

</style>
<template>
  <div id="app">
    <Nav />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'


export default {
  name: 'App',
  components: {Nav}
}
</script>

<style>
@import "~materialize-css/dist/css/materialize.min.css";
</style>

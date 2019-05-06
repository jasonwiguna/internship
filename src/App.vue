<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import MovieDB from './components/MovieDB.vue'
import MovieDescription from './components/MovieDescription.vue'

export default {
  name: 'app',
  components: {
    MovieDescription,
    MovieDB
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

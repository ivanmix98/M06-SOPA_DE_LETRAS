<template>
  <div id="app">
    <router-link to="/"  style="color:#42b983">Home</router-link> |
    <router-link to="/paraules" style="color:#42b983">Paraules</router-link><br>
    <img src="./assets/logo.png">
    <router-view/>

  </div>
</template>

<script>
export default {
  name: 'App'
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

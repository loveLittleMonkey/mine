<template>
  <div id="app">
    <div id="nav">
        <router-link :to="{name: 'ArrayForEach'}">ForEach</router-link> |
        <router-link :to="{name: 'ArrayFunction'}">ArrayFunction</router-link> |
        <router-link :to="{name: 'AsyncAwait'}">AsyncAwait</router-link> |
        <router-link :to="{name: 'testEvent'}">testEvent</router-link> |
        <router-link :to="{name: 'scratchTicket'}">scratchTicket</router-link> |
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
    name: 'App'
};
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
#nav {
    padding: 30px;
}
#nav > a {
    font-weight: bold;
    color: #2c3e50;
}
#nav > a,.router-link-exact-active {
    color: #42b983;
}
</style>

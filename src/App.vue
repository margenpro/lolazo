<template>
  <div>
    <app-nav-bar></app-nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavBar from "./components/AppNavBar.vue";

export default {
  name: "App",
  components: {
    AppNavBar
  },
};
</script>

<style>
</style>

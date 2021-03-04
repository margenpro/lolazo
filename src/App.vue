<template>
  <div>
    <app-nav-bar></app-nav-bar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppNavBar from "./components/AppNavBar.vue";
import AppFooter from "./components/AppFooter.vue";

export default {
  name: "App",
  components: {
    AppNavBar,
    AppFooter,
  },
};
</script>

<style>
</style>

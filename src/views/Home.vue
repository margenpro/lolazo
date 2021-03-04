<template>
  <div class="bg-dark p-5 text-center">
    <h1 class="text-light">Bienvenido Troll!</h1>
    <app-invocador></app-invocador>
  </div>
</template>

<script>
import AppInvocador from "../components/AppInvocador";
export default {
  name: "Home",
  components: {
    AppInvocador,
  },
};
</script>

<style>
</style>

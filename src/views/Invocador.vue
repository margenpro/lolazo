<template>
  <div class="bg-dark p-5 bgd">
    <b-container fluid class="bg-dark p-5">
      <app-invocador></app-invocador>
    </b-container>
  </div>
</template>

<script>
import AppInvocador from "../components/AppInvocador";
export default {
  name: "Invocador",
  components: {
    AppInvocador,
  },
};
</script>

<style>

</style>
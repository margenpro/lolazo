<template>
  <div class="bg-dark p-5 bgd">
    <b-container fluid class="bg-dark p-5">
      <app-invocador-maestrias></app-invocador-maestrias>
    </b-container>
  </div>
</template>

<script>
import AppInvocadorMaestrias from "../components/AppInvocadorMaestrias"

export default {
  name: "Maestrias",
  components: {
    AppInvocadorMaestrias,
  },
  data() {
    return {
    }
  },
};
</script>

<style>

</style>
<template>
  <div class="text-light">
      TODO
  </div>
</template>

<script>
export default {
  data() {
    return {
      champion: "",
    };
  },
  beforeMount() {
    this.champion = this.$store.getters.getChampions.find(
      (e) => e.name == this.$route.params.name
    );
  },
};
</script>
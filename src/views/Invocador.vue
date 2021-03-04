<template>
  <div class="bg-dark p-5 bgd">
    <b-container fluid class="bg-dark p-3 container">
      <div class="text-center">
        <b-card
          v-if="show"
          bg-variant="dark auto center"
          body-text-variant="light mt-3"
          class="text-center"
          style="max-width: 16rem"
          :img-src="getSummonerIcon()"
          img-alt="Image"
          img-left
          img-width="130"
          img-height="130"
          img-fluid
          border-variant="light "
          align="center"
        >
          {{ getSummonerName() }}
          Nivel: {{ getSummonerLevel() }}
        </b-card>
      </div>
      <b-tabs v-if="show" pills fill content-class="bg-dark p-5">
        <b-tab title="Mis Maestrias">
          <app-invocador-maestrias></app-invocador-maestrias>
        </b-tab>
        <b-tab title="Mis Partidas" active></b-tab>
        <app-invocador-partidas></app-invocador-partidas>
      </b-tabs>
    </b-container>
  </div>
</template>

<script>
import AppInvocadorMaestrias from "../components/AppInvocadorMaestrias";
import AppInvocadorPartidas from "../components/AppInvocadorPartidas";
import riotApi from "../modules/riotApi";

export default {
  name: "Invocador",
  components: {
    AppInvocadorMaestrias,
    AppInvocadorPartidas,
  },
  data() {
    return {
      show: this.$route.params.show,
      summoner: this.$store.getters.getSummoner,
    };
  },
  methods: {
    getSummonerName() {
      return this.summoner.name;
    },
   getSummonerLevel() {
      return this.summoner.summonerLevel.toString();
    },
   getSummonerIcon() {
      return riotApi.getSummonerImageById(this.summoner.profileIconId);
    },
  },
};
</script>

<style>
</style>
<template>
  <div>
    <div>
      <b-container>
        <b-list-group>
          <b-list-group-item v-for="match in matchList" :key="match.gameId" class="bg-dark border-dark">
            <app-partida :gameId="match.gameId"></app-partida>
          </b-list-group-item>
        </b-list-group>
      </b-container>
    </div>
  </div>
</template>

<script>
import riotApi from "../modules/riotApi";
import AppPartida from "./AppPartida";

export default {
  components: {
    AppPartida,
  },
  props: {
    gameId: Number,
  },
  data() {
    return {
      accountId: this.$store.getters.getSummoner.accountId,
      matchList: "",
    };
  },
  async mounted() {
    this.matchList = await this.getMatchList(this.accountId);
  },
  methods: {
    async getMatchList(id) {
      return await riotApi.getMatchListByAccId(id);
    },
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key);
    },
    getCHampionName(key) {
      return riotApi.getChampionNameByKey(key);
    },
  },
};
</script>
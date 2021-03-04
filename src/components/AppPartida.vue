<template>
  <div>
    <b-list-group-item :variant="getColorStyle(stats.win)" fluid class="border-light">
      <b-container fluid>
        <b-row>
          <b-col>
            {{ match.gameMode }} <br />
            {{ getWin(stats.win) }}
          </b-col>
          <b-col class="text-center">
            <b-avatar
              :src="getChampionImage(player.championId)"
              size="4rem"
            ></b-avatar>
            <br />
            <b-badge variant="secondary">{{
              getCHampionName(player.championId)
            }}</b-badge>
          </b-col>
          <b-col>
            {{ stats.kills }} / {{ stats.deaths }} / {{ stats.assists }} <br />
            {{ getKda(stats.kills, stats.deaths, stats.assists) }}:1 KDA
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </div>
</template>
<script>
import riotApi from "../modules/riotApi";

export default {
  props: {
    gameId: Number,
  },
  data() {
    return {
      accountId: this.$store.getters.getSummoner.accountId,
      match: "",
      participant: "",
      player: "",
      stats: "",
    };
  },
  async mounted() {
    this.match = await this.getMatchInfo(this.gameId);
    this.participant = await this.getParticipant(this.match, this.accountId);
    this.player = await this.getParticipantStats(
      this.match,
      this.participant.participantId
    );
    this.stats = await this.player.stats;
  },
  methods: {
    async getMatchInfo(id) {
      return await riotApi.getMatchInfoById(id);
    },
    async getParticipant(match, id) {
      return await riotApi.getParticipantByAccId(match, id);
    },
    async getParticipantStats(match, id) {
      return await riotApi.getParticipantFromMatch(match, id);
    },
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key);
    },
    getCHampionName(key) {
      return riotApi.getChampionNameByKey(key);
    },
    getWin(win) {
      return win ? "VICTORIA" : "DERROTA";
    },
    getKda(kills, deaths, assists) {
      return ((kills + assists) / deaths).toFixed(2);
    },
    getColorStyle(win) {
      return win ? "success" : "danger";
    },
  },
};
</script>
<template>
  <div>
    <b-list-group-item
      :variant="getColorStyle(stats.win)"
      fluid
      class="border-light"
    >
      <b-container fluid>
        <b-row>
          <b-col>
            {{ match.gameMode }} <br />
            {{ getWin(stats.win) }}
          </b-col>
          <b-col>
            <div id="contenedor-champ" class="text-center">
              <div id="champ">
                <b-avatar
                  :src="getChampionImage(player.championId)"
                  size="4rem"
                ></b-avatar>
              </div>
              <div id="spells">
                <b-img
                  :src="getSummonerSpell(player.spell1Id)"
                  width="30"
                  height="30"
                  rounded=""
                  id="spell1Id"
                >
                </b-img>
                <b-tooltip target="spell1Id" triggers="hover">
                  <h6>{{getSpellName(player.spell1Id)}}</h6>
                  <p>{{ getSpellTooltip(player.spell1Id) }}</p>
                </b-tooltip>
                <br />
                <b-img
                  :src="getSummonerSpell(player.spell2Id)"
                  width="30"
                  height="30"
                  rounded=""
                  id="spell2Id"
                ></b-img>
                <b-tooltip target="spell2Id" triggers="hover">
                  <h6>{{getSpellName(player.spell2Id)}}</h6>
                  <p>{{ getSpellTooltip(player.spell2Id) }}</p>
                </b-tooltip>
              </div>
            </div>
          </b-col>
          <b-col>
            <div id="kda" class="text-center">
              {{ stats.kills }} / {{ stats.deaths }} / {{ stats.assists }}
              <br />
              {{ getKda(stats.kills, stats.deaths, stats.assists) }} KDA
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <p>Duración: {{ getMatchDuration(match.gameDuration) }}</p>
          </b-col>
          <b-col>
            <div class="text-center">
              <b-badge variant="secondary">{{
                getCHampionName(player.championId)
              }}</b-badge>
            </div>
          </b-col>
          <b-col></b-col>
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
      return deaths == 0
        ? "Perfect"
        : `${((kills + assists) / deaths).toFixed(2)}:1`;
    },
    getColorStyle(win) {
      return win ? "success" : "danger";
    },
    getMatchDuration(seconds) {
      const segundos = Math.round(seconds % 0x3c).toString();
      const horas = Math.floor(seconds / 0xe10).toString();
      const minutos = (Math.floor(seconds / 0x3c) % 0x3c).toString();
      return `${horas}h ${minutos}m ${segundos}s`;
    },
    getSummonerSpell(id) {
      return riotApi.getSpellImageByKey(id);
    },
    getSpellTooltip(id) {
      return riotApi.getSpellDescriptionByKey(id);
    },
    getSpellName(id){
      return riotApi.getSpellNameByKey(id)
    }
  },
};
</script>

<style scoped>
#contenedor-champ {
  display: table-cell;
  width: 150px;
  height: 150px;
  text-align: center; /* X */
  vertical-align: middle; /* Y */
}
#champ {
  display: inline-block;
  width: 70px;
  height: 60px;
  text-align: center;
  vertical-align: top;
}
#spells {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
}
#kda {
  display: inline-block;
  width: 90px;
  height: 50px;
  text-align: right;
}
</style>
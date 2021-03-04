<template>
  <div class="text-light">
    <div>
      <b-container>
        <b-row>
          <b-card-group
            deck
            v-for="champion in maestries"
            :key="champion.championId"
          >
            <b-col>
              <b-card
                bg-variant="dark auto center"
                :header="getChampionName(champion.championId)"
                class="text-center border-dark"
                style="max-width: 10rem"
                :img-src="getChampionImage(champion.championId)"
                img-alt="Image"
                img-width="70"
                img-height="150"
                img-fluid
                img-top
                fluid
              >
                <b-card-body class="auto">
                  <b-img
                    :src="getMasteryImage(champion.championLevel)"
                    fluid
                    width="60"
                    height="90"
                  ></b-img>
                  Nivel: {{ champion.championLevel }} <br />
                  Puntos: {{ champion.championPoints }}
                </b-card-body>
              </b-card>
            </b-col>
          </b-card-group>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import riotApi from "../modules/riotApi";

export default {
  data() {
    return {
      summonerId: "",
      maestries: "",
    };
  },
  async mounted() {
    this.summonerId = await this.$route.params.sumId;
    this.maestries = await this.getMaestries(this.summonerId);
  },
  methods: {
    getMasteryImage(id) {
      return riotApi.getMasteryImage(id);
    },
    getChampionName(key) {
      return riotApi.getChampionNameByKey(key);
    },
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key);
    },

    async getMaestries(id) {
      let maestrias = null;
      try {
        maestrias = await riotApi.getChampionsMasteryBySummonerId(id);
      } catch (e) {
        alert(e.message);
      }
      return maestrias;
    },
  },
};
</script>
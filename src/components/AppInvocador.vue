<template>
  <div class="text-light">
    <b-form @submit="onSubmit" class="m-1 text-center">
      <b-form-input
        v-model="name"
        placeholder="Ingresar nombre del Invocador"
      ></b-form-input>
      <b-button class="m-3" type="submit" variant="primary">Buscar</b-button>
    </b-form>
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
                class="text-center"
                style="max-width: 10rem"
                :img-src="getChampionImage(champion.championId)"
                img-alt="Image"
                img-top
                fluid
              >
                <b-card-body class="auto">
                  <b-img
                    :src="getMasteryImage(champion.championLevel)"
                    fluid
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
      name: "",
      summoner: "",
      maestries: "",
    };
  },
  methods: {
    getMasteryImage(id) {
      return riotApi.getMasteryImage(id);
    },
    getChampionName(key) {
      return riotApi.getChampionNameByKey(key)
    },
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key)
    },

    async onSubmit(evt) {
      evt.preventDefault();
      this.summoner = await this.getSummoner(this.name);
      this.maestries = await this.getMaestries(await this.summoner.id);
    },
    async getSummoner(name) {
      let invocador = null;
      try {
        invocador = await riotApi.getSummonerByName(name);
      } catch (e) {
        alert(e.message);
      }
      return invocador;
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
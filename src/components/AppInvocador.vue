<template>
  <div class="text-light p-1 container">
    <b-form @submit="onSubmit" class="m-1 text-center">
      <b-form-input
        v-model="name"
        placeholder="Ingresar nombre del Invocador"
        fluid
      ></b-form-input>
      <b-button class="m-3" type="submit" variant="primary">Buscar</b-button>
    </b-form>
    <b-container>
      <router-link
        class="mt-1"
        :to="{ name: 'Invocador', params: { sumId, show } }"
      >
        <b-card
          v-if="show"
          bg-variant="dark auto center"
          :header="getSummonerName()"
          class="text-center"
          style="max-width: 10rem"
          :img-src="getSummonerIcon()"
          img-alt="Image"
          img-bottom
        >
          Nivel: {{ getSummonerLevel() }}
        </b-card>
      </router-link>
    </b-container>
  </div>
</template>

<script>
import riotApi from "../modules/riotApi";

export default {
  data() {
    return {
      name: "",
      summoner: "",
      show: false,
      profileIconId: "",
      level: "",
      sumName: "",
      sumId: "",
    };
  },
  methods: {
    getSummonerName() {
      return this.sumName;
    },
    getSummonerLevel() {
      return this.level.toString();
    },
    getSummonerIcon() {
      return riotApi.getSummonerImageById(this.profileIconId);
    },
    async onSubmit(evt) {
      evt.preventDefault();
      this.summoner = await this.getSummoner(this.name);
      this.profileIconId = await this.summoner.profileIconId;
      this.level = await this.summoner.summonerLevel;
      this.sumName = await this.summoner.name;
      this.sumId = await this.summoner.id;
      this.show = true;
    },
    async getSummoner(name) {
      let invocador = null;
      try {
        await this.$store.dispatch("getSummonerByName", name);
        invocador = this.$store.getters.getSummoner;
      } catch (e) {
        alert(e.message);
      }
      return invocador;
    },
  },
};
</script>
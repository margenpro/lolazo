<template>
  <div class="text-light">
    <div class="p-5" style="max-width: 30rem">
      <input
        type="text"
        placeholder="Buscar Campeón"
        class="form-control"
        v-model="champName"
      />
    </div>
    <b-container fluid class="text-center">
      <b-row>
        <b-card-group
          deck
          v-for="champion in searchChamp"
          :key="champion.key"
          fluid
        >
          <div style="max-width: 9rem">
            <router-link
              class="mt-1"
              :to="{ name: 'ChampionInfo', params: { name: champion.name } }"
            >
              <b-card
                bg-variant="dark auto center"
                class="text-center border-dark p-1"
                :img-src="getChampionImage(champion.key)"
                img-alt="Image"
                img-height="120"
                img-width="130"
                img-bottom         
              >
              </b-card>
              <b-card-body body-text-variant="light" body-class="p-0">
                {{getChampionName(champion.key)}}
              </b-card-body>
            </router-link>
          </div>
        </b-card-group>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import riotApi from "../modules/riotApi";

export default {
  data() {
    return {
      champions: this.$store.getters.getChampions,
      champName: "",
      name: "",
    };
  },
  methods: {
    getChampions() {
      return this.champions;
    },
    getChampionName(key) {
      return riotApi.getChampionNameByKey(key);
    },
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key);
    },
  },
  computed: {
    searchChamp() {
      return this.champions.filter((champion) =>
        champion.name.toLowerCase().includes(this.champName.toLowerCase())
      );
    },
  },
};
</script>
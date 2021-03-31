<template>
  <div class="text-light">
    <b-container fluid>
      <b-row>
        <b-col>
          <div id="contenedor-champ">
            <div id="champ">
              <b-card
                bg-variant="dark auto center"
                :header="champion.name"
                class="text-center border-dark"
                style="max-width: 10rem"
                :img-src="getChampionImage(champion.key)"
                img-alt="Image"
                img-height="120"
                img-width="130"
                img-top
              >
              </b-card>
            </div>
            <div id="tittle">
              <h6>
                {{ getChampionTitle(champion.title) }}
              </h6>
              <br />
              <p>
                <strong>{{ champion.tags[0] }} </strong>
                {{ champion.tags[1] }}
              </p>
            </div>
          </div>
        </b-col>
        <b-col md="5" offset-md="0">
          <b-container>
            <b-row>
              <b-col>
                <b>Vida</b>
                <br />
                {{ champion.stats.hp }}
                ({{ champion.stats.hpperlevel }})
              </b-col>
              <b-col
                ><b>Regeneración de Vida</b>
                <br />
                {{ champion.stats.hpregen }}
                ({{ champion.stats.hpregenperlevel }})
              </b-col>
              <b-col
                ><b>Mana</b>
                <br />
                {{ champion.stats.mp }}
                ({{ champion.stats.mpperlevel }})
              </b-col>
            </b-row>
            <b-row>
              <b-col
                ><b>Regeneración de Mana</b>
                <br />
                {{ champion.stats.mpregen }}</b-col
              >
              <b-col
                ><b>Daño de Ataque</b>
                <br />
                {{ champion.stats.attackdamage }}</b-col
              >
              <b-col
                ><b>Velocidad de Ataque</b>
                <br />
                {{ champion.stats.attackspeed }}</b-col
              >
            </b-row>
            <b-row>
              <b-col
                ><b>Armadura</b>
                <br />
                {{ champion.stats.armor }}
                ({{ champion.stats.armorperlevel }})
              </b-col>
              <b-col
                ><b>Resistencia Mágica</b>
                <br />
                {{ champion.stats.spellblock }}
                ({{ champion.stats.spellblockperlevel }})
              </b-col>
              <b-col
                ><b>Alcance</b>
                <br />
                {{ champion.stats.attackrange }}</b-col
              >
            </b-row>
            <b-row>
              <b-col
                ><b>Movilidad</b>
                <br />
                {{ champion.stats.movespeed }}</b-col
              >
              <b-col
                ><b>Golpe Crítico</b>
                <br />
                {{ champion.stats.crit }}</b-col
              >
            </b-row>
          </b-container>
        </b-col>
        <b-col>
          <div class="col-md-6 pt-0 text-center">
            <h6><b>Características</b></h6>
            Ataque
            <b-progress
              :value="champion.info.attack"
              variant="danger"
              max="10"
              show-value
            ></b-progress>
            Defensa
            <b-progress
              :value="champion.info.defense"
              variant="success"
              max="10"
              show-value
            ></b-progress>
            Magia
            <b-progress
              :value="champion.info.defense"
              variant="primary"
              max="10"
              show-value
            ></b-progress>
            Dificultad
            <b-progress
              :value="champion.info.defense"
              variant="secondary"
              max="10"
              show-value
            ></b-progress>
          </div>
        </b-col>
        <b-col md="1" offset-md="0">
          <div class="text-center">
            <b-button
              variant="outline-secondary"
              pill
              size="lg"
              :to="{ name: 'ChampionBuild', params: { name: champion.name } }"
            >
              Ver Build
            </b-button>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
      </b-row>
      <b-list-group-item variant="info">
        <b-row align-v="start" cols-md="1">
          <b-col md="1" offset-md="0">
            <b-avatar
              square
              size="lg"
              class="mr-5"
              :src="getSpellImage(champPassive.image.full)"
            >
            </b-avatar>
          </b-col>
          <b-col md="10" offset-md="0">
            <b-row>
              <b>{{ champPassive.name }}</b>
            </b-row>
            <b-row>
              <span>{{ champPassive.description }}</span>
            </b-row>
          </b-col>
        </b-row>
      </b-list-group-item>
      <br />
      <b-list-group v-for="(spell, index) in champSpells" :key="spell.id">
        <b-list-group-item variant="info">
          <b-row align-v="start" cols-md="1">
            <b-col md="1" offset-md="0">
              <b-avatar
                square
                size="lg"
                class="mr-5"
                :badge="letrasSpells[index]"
                badge-variant="dark"
                :src="getSpellImage(spell.image.full)"
              >
              </b-avatar>
            </b-col>
            <b-col md="10" offset-md="0">
              <b-row>
                <b>{{ spell.name }}</b>
              </b-row>
              <b-row>
                <span>{{ spell.description }}</span>
              </b-row>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-container>
  </div>
</template>
<script>
import riotApi from "../modules/riotApi";
import champApi from "../modules/champApi";

export default {
  data() {
    return {
      champion: "",
      champSpells: "",
      champPassive: "",
      letrasSpells: ["Q", "W", "E", "R"],
    };
  },
  beforeMount() {
    this.champion = this.$store.getters.getChampions.find(
      (e) => e.name == this.$route.params.name
    );
    this.champSpells = champApi.getChampSpellsByName(this.$route.params.name);
    this.champPassive = champApi.getChampPassiveByName(this.$route.params.name);
  },
  methods: {
    getChampionImage(key) {
      return riotApi.getChampionImageByKey(key);
    },
    getChampionTitle(title) {
      let retorno = title;
      if (title.slice(0, 4) == "the ") {
        retorno = "The " + title.slice(4);
      }
      return retorno;
    },
    getSpellId(id) {
      return id.slice(-1);
    },
    getSpellImage(id) {
      return champApi.getSpellImageByiId(id);
    },
  },
};
</script>
<style scoped>
#contenedor-champ {
  display: table-cell;
}
#champ {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
#tittle {
  display: inline-block;
  text-align: justify;
  vertical-align: top;
}
#blurb {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
}
</style>
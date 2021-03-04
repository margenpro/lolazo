import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import hasher from './modules/hasher'

Vue.use(Vuex)
const key = hasher.getApiKey()

export const store = new Vuex.Store({
  state: {
    activeSummoner: {},
  },
  mutations: {
    async getSummonerByName(state, summoner) {
      state.activeSummoner = await summoner
    },
  },

  actions: {
    async getSummonerByName(context, name) {
        let response = await getSummonerByName(name)
        context.commit('getSummonerByName', response)
      },
  },
  getters: {
    getSummoner:  (state) => {
      return  state.activeSummoner
    },
    getSummonerLevel: (state) => {
        return state.activeSummoner.summonerLevel
    },
    getSummonerPrfileIconId: (state) => {
        return state.activeSummoner.profileIconId
    },
  }
})

async function getSummonerByName (name) {
    let retorno = null
    try{
        const res = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${key}`)
         retorno = res.data
    } catch(e){
        throw new Error("Error al conectar con Riot")
    }
    return retorno
}



export default store
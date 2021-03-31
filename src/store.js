import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import hasher from './modules/hasher'
import riotApi from './modules/riotApi'

Vue.use(Vuex)
const key = hasher.getApiKey()

export const store = new Vuex.Store({
  state: {
    activeSummoner: {},
    champions: [],
  },
  mutations: {
    async getSummonerByName(state, summoner) {
      state.activeSummoner = await summoner
    },
    getChampions(state, champs){
      state.champions = champs
    },
  },

  actions: {
    async getSummonerByName(context, name) {
        let response = await getSummonerByName(name)
        context.commit('getSummonerByName', response)
      },
      getChampions(context){
        let res = getChampionList()
        context.commit('getChampions',res)
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
    getChampions: (state) => {
      return state.champions
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

function getChampionList(){
  return Object.values(riotApi.getChampionsList())
}



export default store
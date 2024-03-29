import axios from 'axios'
import hasher from './hasher'
import championsJson from '../modules/champions.json'
import summonerJson from '../modules/summoner.json'

const key = hasher.getApiKey()

async function getSummonerByName(name) {
    let retorno = null
    try {
        const res = await axios.get(`https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${key}`)
        retorno = res.data
    } catch (e) {
        throw new Error("Error al conectar con Riot")
    }
    return retorno
}
async function getMatchListByAccId(accId) {
    let retorno = null
    try {
        const res = await axios.get(`https://la2.api.riotgames.com/lol/match/v4/matchlists/by-account/${accId}`, {
            params: {
                api_key: key,
                endIndex: 10,
            }
        })
        retorno = res.data.matches
    } catch (e) {
        throw new Error("Error al conectar con Riot")
    }
    return retorno
}
async function getMatchInfoById(gameId) {
    let retorno = null
    try {
        const res = await axios.get(`https://la2.api.riotgames.com/lol/match/v4/matches/${gameId}`, {
            params: {
                api_key: key,
            }
        })
        retorno = res.data
    } catch (e) {
        throw new Error("Error al conectar con Riot")
    }
    return retorno
}

async function getParticipantByAccId(match, accId){
    return await match.participantIdentities.find(e => e.player.accountId == accId)
}

async function getParticipantFromMatch(match, participantId){
    return await match.participants.find(e => e.participantId == participantId)
}

async function getChampionsMasteryBySummonerId(id) {
    let retorno = null
    try {
        const res = await axios.get(`https://la2.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}`, {
            params: {
                api_key: key
            }
        })
        retorno = res.data
    } catch (e) {
        throw new Error("Error al conectar con Riot")
    }
    return retorno
}

function getChampionsList() {
    return championsJson.data
}

function getChampionNameByKey(key) {
    const champions = Object.values(getChampionsList())
    let champ = champions.find(e => e.key == key)
    return champ.name
}

function getChampionImageByKey(key) {
    const champions = Object.values(getChampionsList())
    let champ = champions.find(e => e.key == key)
    return `/imgChampions/${champ.image.full}`
}

function getMasteryImage(id) {
    return `/mastery/Champion_Mastery_Level_${id}_Flair.png`
}

function getSummonerImageById(id) {
    return `/profileicon/${id}`
}

function getSummonerSpellsData(){
    return summonerJson.data
}

function getSpellImageByKey(key){
    const data = Object.values(getSummonerSpellsData())
    let spell = data.find(e => e.key == key)
    return `/summonerSpells/${spell.image.full}`
}

function getSpellDescriptionByKey(key) {
    const data = Object.values(getSummonerSpellsData())
    let spell = data.find(e => e.key == key)
    return spell.description
}

function getSpellNameByKey(key){
    const data = Object.values(getSummonerSpellsData())
    let spell = data.find(e => e.key == key)
    return spell.name
}

export default {
    getSummonerByName,
    getMatchListByAccId,
    getChampionsMasteryBySummonerId,
    getChampionsList,
    getChampionNameByKey,
    getChampionImageByKey,
    getMasteryImage,
    getSummonerImageById,
    getMatchInfoById,
    getParticipantByAccId,
    getParticipantFromMatch,
    getSpellImageByKey,
    getSpellDescriptionByKey,
    getSpellNameByKey
}
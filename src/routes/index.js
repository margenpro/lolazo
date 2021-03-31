import Home from '../views/Home.vue'
import Invocador from '../views/Invocador.vue'
import Champions from '../views/Champions.vue'
import ChampionInfo from '../views/ChampionInfo.vue'
import ChampionBuild from '../views/ChampionBuild.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/champions',
        name: 'Champions',
        component: Champions
    },
    {
        path: '/champions/:name',
        name: 'ChampionInfo',
        component: ChampionInfo
    },
    {
        path: '/champions/:name/build',
        name: 'ChampionBuild',
        component: ChampionBuild
    },
    {
        path: '/invocador',
        name: 'Invocador',
        component: Invocador
    },
    {
        path: '/invocador/maestrias',
        name: 'Maestrias',
        component: Invocador
    },
]
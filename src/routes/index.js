import Home from '../views/Home.vue'
import Invocador from '../views/Invocador.vue'

export default [
    {
        path: '/',
        name: 'Home',
        component: Home
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
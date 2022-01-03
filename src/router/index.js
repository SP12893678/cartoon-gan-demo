import Vue from 'vue'
import Router from 'vue-router'

import Homepage from '../views/Homepage.vue'

Vue.use(Router)

const router = new Router({
    routes: [
        { 
            path: '/', 
            component: Homepage,
        }
    ]
    // mode: 'history'
})


export default router

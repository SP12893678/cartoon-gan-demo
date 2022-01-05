import './style.css'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuescroll from 'vuescroll'
import store from './store'

Vue.use(vuescroll)
Vue.prototype.$vuescrollConfig = {
    bar: {
        background: '#666'
    }
}

new Vue({
    store,
    router,
    el: '#app',
    render: h => h(App)
})

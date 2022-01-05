import Vue from 'vue'
import Vuex from 'vuex'

const _modules = () => {
    return {

    }
}

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: _modules(),
    state: {
        snackBar: {
            show: false,
            message: ''
        }
    },
    mutations: {
        snackBar (state, value) {
            state.snackBar.show = value.show
            state.snackBar.message = value.message
        }
    },
    actions: {

    }
})

export default store

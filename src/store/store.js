import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData
      localStorage.setItem('user', JSON.stringify(userData))
      axios.defaults.headers.common['Authorization'] = `Bearer ${
        userData.token
      }`
    },
    LOG_OUT() {
      // state.user = null
      localStorage.removeItem('user')
      // axios.defaults.headers.common['Authorization'] = null
      location.reload()
    }
  },
  actions: {
    register({
      commit
    }, credentials) {
      return axios
        .post('//localhost:3000/register', credentials)
        .then(({
          data
        }) => {
          console.log('user data is', data)
          commit('SET_USER_DATA', data)
        })
    },
    login({
      commit
    }, credentials) {
      return axios
        .post('//localhost:3000/login', credentials)
        .then(({
          data
        }) => {
          commit('SET_USER_DATA', data)
        })
    },
    logout({
      commit
    }) {
      commit('LOG_OUT')
    }

  },
  getters: {
    loggedIn(state) {
      return !!state.user
    }
  }
})

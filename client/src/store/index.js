import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  	user: null
  },
  getters: {
  	user: state => {
  		return state.user;
  	}
  },
  mutations: {
  	updateUser(state, data) {
  		state.user = data;
  	}
  },
  actions: {
  	getUser ({ commit }, data) {
  		commit('updateUser', data);
  	}
  },
  modules: {
  },
});

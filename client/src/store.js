import Vue from 'vue';
import Vuex from 'vuex';
import alertify from 'alertifyjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    owner: '',
    roomName: '',
    player1: '',
    player2: '',
    point1: 0,
    point2: 0,
    indexQ: 0,
  },
  mutations: {
  },
  actions: {
  },
});

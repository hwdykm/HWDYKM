import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/api/firebase'
import alertify from 'alertifyjs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    owner: '',
    roomName: '', //dari owner + random number 3 digit
    player1: '',
    player2: '',
    questions: [],
    point1: 0,
    point2: 0,
    questionIndex: 0,
    roomStatus: false,
    data: []
  },
  mutations: {

  },
  actions: {
    findOne({ commit }, { roomName, user }) {
      let id
      let data
      db
        .collection('hwdykm')
        .where('roomName', '==', roomName)
        .onSnapshot((snapshot) => {
          snapshot.forEach((change) => {
            id = change.id
            data = change.data()
          })
          console.log(data)
          if (data.player1 == '') {
            state.player1 = user
            db
              .collection('hwdykm')
              .doc(id)
              .update({ player1: user })
          } else if (data.player1 != '') {
            state.player2 = user
            db
              .collection('hwdykm')
              .doc(id)
              .update({ player2: user })
          }
        })
    },
    generateRandomId({commit}) {
      //ambil dari localstorage + random Number / ambil dari owner
    },
    intoPlayRoom() {
      //
    }
  },
});

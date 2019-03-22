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
    roomStatus: false
  },
  mutations: {

  },
  actions: {
    findOne() {
      db
        .collection('hwdykm')
        .where('roomName', '==', 'mahdi123')
        .onSnapshot((snapshot) => {
          // snapshot.forEach((change) => {
            // this.id = change.id;
            // this.update();
          // });
        });
    },
    update() {
      db
        .collection('hwdykm')
        .doc(this.id)
        .update({
          user1: 'eltim' 
        });
    },
    generateRandomId({commit}) {
      //ambil dari localstorage + random Number / ambil dari owner
    },
    intoPlayRoom() {
      //
    }
  },
});

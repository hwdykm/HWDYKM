import Vue from 'vue';
import Vuex from 'vuex';
import { db, firebase } from '@/api/firebase'
import alertify from 'alertifyjs';
import router from './router'
import store from './store'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: 'yHOCrnquTvx42fG3SKLD',
    owner: '',
    roomName: 'mahdi123', //dari owner + random number 3 digit
    player1: 'eltim',
    player2: 'willy',
    questions: [],
    point1: 0,
    point2: 0,
    questionIndex: 0,
    roomStatus: false,
    data: []
  },
  mutations: {
    createNewRoom(state, payload) {
      state.id = payload.id
      state.owner = payload.owner
      state.roomStatus = payload.roomStatus
      state.roomName = payload.roomName
    },
    setNewQuestion(state, payload) {
      state.questions.push(payload)
    }
  },
  actions: {

    createRoom({commit}) {
      let roomNameGenerated = localStorage.getItem('username')
      for (let i = 0; i < 3; i++) {
        roomNameGenerated += Math.floor(Math.random() * 9)
      }

      const newRoom = {
        owner: localStorage.getItem('username'),
        roomName: roomNameGenerated,
        player1: '',
        player2: '',
        questions: [],
        point1: 0,
        point2: 0,
        questionIndex: 0,
        roomStatus: false
      }

      db
      .collection('hwdykm')
      .add(newRoom)
      .then(function (docRef) {
        console.log(docRef.id, `--- docRef.id`)
        commit('createNewRoom', {
          id: docRef.id,
          roomStatus: false,
          owner: localStorage.getItem('username'),
          roomName: roomNameGenerated,
        });
        router.push('/create-questions')
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    addQuestion({ commit }, payload) {
      let roomId = store.state.id
      db
        .collection('hwdykm')
        .doc(roomId)
        .update({
          questions: firebase.firestore.FieldValue.arrayUnion(payload),
        })
        .then(() => {
          commit('setNewQuestion', payload)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    findOne() {
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
    intoPlayRoom() {
      //
    }
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import { db } from '@/api/firebase'
import alertify from 'alertifyjs';
import router from './router'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: '',
    owner: '',
    roomName: 'mahdi123', //dari owner + random number 3 digit
    player1: '',
    player2: '',
    questions: [],
    point1: 0,
    point2: 0,
    questionIndex: 0,
    roomStatus: false
  },
  mutations: {
    // generateRoomName(state) {//ambil dari localstorage + random Number / ambil dari owner
    //   let roomNameGenerated = ''
    //   for (let i = 0; i < 3; i++) {
    //     roomNameGenerated += Math.floor(Math.random() * 9)
    //   }
      // state.roomName = state.owner + roomNameGenerated
    // },
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
    addQuestion({commit}, payload) {
      const newQuestion = {
        question: payload.question,
        options: {
          a: payload.option1,
          b: payload.option2,
          c: payload.option3,
        },
        answer: payload.answer
      };

      db
        .collection('hwdykm')
        .doc()
        .update({
          questions: firebase.firestore.FieldValue.arrayUnion(newQuestion),
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
    intoPlayRoom() {
      //
    }
  },
});

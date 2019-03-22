import Vue from "vue";
import Vuex from "vuex";
import { db, firebase } from "@/api/firebase";
import alertify from "alertifyjs";
import router from "./router";
import store from "./store";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    id: "",
    owner: "",
    roomName: "", //dari owner + random number 3 digit
    player1: "",
    player2: "",
    questions: [],
    point1: 0,
    point2: 0,
    questionIndex: 0,
    roomStatus: false,
    data: []
  },
  mutations: {
    createNewRoom(state, payload) {
      state.id = payload.id;
      state.owner = payload.owner;
      state.roomStatus = payload.roomStatus;
      state.roomName = payload.roomName;
    },
    setNewQuestion(state, payload) {
      state.questions.push(payload);
    },
    setUser(state, payload) {
      console.log("masok set user jengggggggggggggggggggggg", payload.cmd);
      if (payload.cmd === "player1") {
        console.log(payload, 'ini player 1=====');
        state.player1 = payload.user;
      } 
      if (payload.cmd === "player2") {
        console.log(payload, 'ini player 2=====');
        state.player2 = payload.user;
      }
    },
    setId(state, payload) {
      state.id = payload
    },
    getQuestion(state, payload) {
      console.log(payload, 'ini dalem get questionnnnnnnnn')
      state.questions = payload
    }
  },
  actions: {
    createRoom({ commit }) {
      let roomNameGenerated = localStorage.getItem("username");
      for (let i = 0; i < 3; i++) {
        roomNameGenerated += Math.floor(Math.random() * 9);
      }

      const newRoom = {
        owner: localStorage.getItem("username"),
        roomName: roomNameGenerated,
        player1: "",
        player2: "",
        questions: [],
        point1: 0,
        point2: 0,
        questionIndex: 0,
        roomStatus: false
      };

      db.collection("hwdykm")
        .add(newRoom)
        .then(function(docRef) {
          console.log(docRef.id, `--- docRef.id`);
          commit("createNewRoom", {
            id: docRef.id,
            roomStatus: false,
            owner: localStorage.getItem("username"),
            roomName: roomNameGenerated
          });
          router.push("/create-questions");
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    addQuestion({ commit }, payload) {
      let roomId = store.state.id;
      db.collection("hwdykm")
        .doc(roomId)
        .update({
          questions: firebase.firestore.FieldValue.arrayUnion(payload)
        })
        .then(() => {
          commit("setNewQuestion", payload);
        })
        .catch(err => {
          console.log(err);
        });
    },
    findOne({ commit }, { roomName, user }) {
      let id;
      let data;
      let question;
      // console.log(roomName, user)
      db.collection("hwdykm")
        .where("roomName", "==", roomName)
        .onSnapshot(snapshot => {
          snapshot.forEach(change => {
            id = change.id;
            data = change.data();
          });

          commit('getQuestion', data.questions)

          console.log(data);
          console.log(data.player1);
          console.log(user);
          // debugger

          commit('setId', id)

          if (data.player1.length == 0) {
            // state.player1 = user
            db.collection("hwdykm")
              .doc(id)
              .update({ player1: user });

            commit("setUser", {
              user: user,
              cmd: "player1"
            });
            console.log("masok 1====");
          } else if (data.player1 !== user && data.player2.length === 0) {
            // state.player2 = user
            console.log("masok 2===========");
            commit("setUser", {
              user: user,
              cmd: "player2"
            });
            db.collection("hwdykm")
              .doc(id)
              .update({ player2: user });
          }
          console.log(data.player1 !== user && data.player2.length !== 0);
        });
        
    },
    intoPlayRoom() {
      //
    }
  }
});

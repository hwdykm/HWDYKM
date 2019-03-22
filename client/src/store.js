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
    setUser(state, payload) {
      if (payload.cmd === 'player1') {
        state.player1 = payload.user
      } else {
        state.player2 = payload.user
      }
    },
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
      console.log("masok set user", payload.cmd);
      if (payload.cmd === "player1") {
        console.log(payload);
        state.player1 = payload.user;
      } 
      if (payload.cmd === "player2") {
        state.player2 = payload.user;
      }
    },
    changeRoomStatus(state, payload) {
      state.roomStatus = payload
    },
    setUsers(state, payload) {
      state.player1 = payload.player1
      state.player2 = payload.player2
      state.owner = payload.owner
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
      // console.log(roomName, user)
      db.collection("hwdykm")
        .where("roomName", "==", roomName)
        .onSnapshot(snapshot => {
          snapshot.forEach(change => {
            id = change.id;
            data = change.data();
          });
          // debugger
          let cek = false;
          if (data.player1.length == 0) {
            cek = true;
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
        });
    },
    intoPlayRoom() {
      //
    }
  }
});

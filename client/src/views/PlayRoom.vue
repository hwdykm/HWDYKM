<template>
  <div class="container center">
    <div class="continer">
      <a id="show-id-button" @click="toggle" class="btn modal-trigger waves-effect black">my room id</a>
    </div>
    <h5 v-if="toggled">{{ roomName }}</h5>
    <img v-if="loading" 
        src="https://static1.squarespace.com/static/5318c0a4e4b0ee73efedcae0/t/5aefe98303ce645868751f85/1525672353251/swirl+of+color+on+axis+lines.gif"
         alt=""
         width="300rem"
    >
    <h5 v-if="player1Cond">{{ player1 }} joined as Player 1</h5>
    <h5 v-if="player2Cond"> {{ player2 }} joined as Player 2</h5>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { debug } from 'util';
import { db } from '@/api/firebase.js'

export default {
  name: "playroom",
  created() {
      this.checkCond()
      this.getDetails()
  },
  computed: mapState(["id", "roomName", "player1", "player2", "roomStatus"]),
  watch: {
      player1(v) {
          if (v.length > 0) {
            this.player1Cond = true
          } else {
            this.player1Cond = false
          }
      },
      player2(v) {
          if (v.length > 0) {
            this.player2Cond = true
          } else {
            this.player1Cond = false
          }
      },
      allplayers(v) {
          if(v.length === 2) {
              console.log('game start!')
          }
      }

  },
  data() {
    return {
        toggled: false,
        loading: true,
        player1Cond: false,
        player2Cond: false,
        allplayers: []
    };
  },
  methods: {
      checkCond() {
        if (this.player1.length > 0) {
            this.player1Cond = true
            this.allplayers.push(this.player1)
        }
        if (this.player2.length > 0) {
            this.player2Cond = true
            this.allplayers.push(this.player2)
        }
      },
      toggle() {
          this.toggled = !this.toggled
      },
      changeStatus() {
          this.$store.commit('changeRoomStatus', true)
      },
      getDetails() {
          db
            .collection('hwdykm')
            .doc(this.id)
            .onSnapshot(doc => {
              let data = doc.data()
              console.log(doc.data())
              this.$store.commit('setUsers', {
                player1: data.player1,
                player2: data.player2,
                owner: data.owner
              })
            })
      }
  }
};
</script>

<style>
</style>

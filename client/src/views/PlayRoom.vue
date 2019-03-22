<template>
  <div class="container center">
    <div class="continer">
      <h1>play room id: {{ roomName }}</h1>
      <a id="show-id-button" @click="toggle" class="btn modal-trigger waves-effect black">my room id</a>
    </div>
    <h5 v-if="toggled">{{ roomName }}</h5>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "playroom",
  computed: mapState(["roomName", "player1", "player2", "roomStatus"]),
  data() {
    return {
        toggled: false,
    };
  },
  methods: {
      toggle() {
          this.toggled = !this.toggled
      }
  }
};
</script>

<style>
</style>

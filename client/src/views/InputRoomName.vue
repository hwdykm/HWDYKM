<template>
  <div class="room-name">
    <div class="room">
      <form class="inner">
        <div class>
          <div class="input-field col s6">
            <form @submit.prevent="addUser">
              <input id="input_text" type="text" placeholder="Enter Room Name" v-model="roomName">
              <label for="input_text">Room Name</label>
            </form>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import stores from "../store.js";
import { mapState } from "vuex";

export default {
  name: "InputRoomName",
  computed: mapState(["roomStatus"]),
  data() {
    return {
      roomName: "",
      user: "",
      user2: ""
    };
  },
  watch: {
    roomStatus: function(v) {
      console.log("masok room status watcherrrrr");
      if (v === true) {
          this.$router.push(`/game/${this.roomName}`)
      }
    }
  },
  methods: {
    addUser() {
      this.$store.dispatch("findOne", {
        roomName: this.roomName,
        user: localStorage.getItem("username")
      });
    }
  }
};
</script>

<style scoped>
.room-name {
  width: 100%;
  height: 100%;
  margin: 0;
}

.room {
  margin-top: 25%;
  margin-left: 30%;
  margin-right: 30%;
}

.inner {
  padding-top: 10%;
  padding-bottom: 10%;
}
</style>

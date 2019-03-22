<template>
  <div>
    <div id="content" class="container center">
      <div class="row">
        <div id="button-ask" class="input-field col s4 offset-s2">
          <a href="#" class="waves-effect black btn-large" @click="createNewRoom">ASK</a>
        </div>
        <div id="button-ans" class="input-field col s4">
          <!-- <a class="waves-effect black btn-large">ANS</a> -->
          <router-link to="/input-room-name" class="waves-effect black btn-large">ANS</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapActions } from 'vuex';

export default {
  name: 'choose-qa',
  methods: {
    createNewRoom() {
      this.$store.dispatch('createRoom')
    }
  }
};
</script>

<style scoped>
#content {
  margin-top: 18rem;
  border: 1px solid black;
  height: 20rem;
  width: 40rem;
}

#button-ask {
  size: 3rem;
  margin-top: 8rem;
}

#button-ans {
  margin-top: 8rem;
}

#button-ask:hover {
  /* width: 10rem; */
}
</style>

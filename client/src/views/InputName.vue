<template>
  <div>
    <div id="content" class="container center">
      <div class="row">
        <form class="input-field col s6 offset-s3" @submit.prevent="submit">
          <div class="input">
            <input id="input-username" type="text" class="validate center" autocomplete="off" v-model="name">
            <label for="username">input your name here</label>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'inputNameForm',
    data() {
        return {
            name: "",
        }
    },
    methods: {
        submit() {
            localStorage.setItem("ownerName", this.name)
            console.log('submitted!', this.name )
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

#input-username {
  margin-top: 5rem;
}

#input-username:focus {
  border-bottom: 1px solid #000000;
  box-shadow: 0 1px 0 0 #000000;
}

#input-username:focus + label {
  color: #000000;
}
</style>

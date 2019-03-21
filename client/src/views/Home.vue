<template>
  <div class="home">
      <Navbar />
      <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import firebase from '@/api/firebase.js'

export default {
    name: 'home',
    components: {
        Navbar
    },
    data() {
        return {
            todoList: [],
            id: ''
        }
    },
    created: function() {
        return this.findOne() 
    },
    methods: {
        findOne() {
            firebase
                .collection('hwdykm')
                .where('roomName', '==', 'mahdi123')
                .onSnapshot((snapshot) => {
                    this.todoList = []
                    snapshot.forEach((change) => {
                        this.id = change.id 
                        this.update()  
                    })
                })
        },
        update() {
            firebase
                .collection('hwdykm')
                .doc(this.id)
                .update({ user1: 'eltim'})
        }
    }
};
</script>

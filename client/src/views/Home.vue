<template>
  <div class="home">
      <Navbar />
      <router-view />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import { firebase } from '@/api/firebase';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data() {
    return {
    };
  },
  created() {
  },
  methods: {
  },
};
</script>

<template>
    <Header2 />
    <h1 class="text-5xl text-center text-green-800 my-4">Logga in</h1>
    <Login />
</template>

<script>
import Login from '../components/Login.vue';
import Header2 from '../components/Header2.vue'

export default {
  components: {
    Login,
    Header2
  }
};
</script>
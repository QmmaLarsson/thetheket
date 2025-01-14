<template>
<main>
  <Header />
  <RouterView />
</main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue';
</script>
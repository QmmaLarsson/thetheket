<template>
    <div class="flex flex-col min-h-screen">
  <main class="flex-grow">
    <RouterView />
  </main>
  <Footer />
</div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Footer from './components/Footer.vue';
</script>
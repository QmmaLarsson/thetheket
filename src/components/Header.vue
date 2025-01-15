<template>
    <header class="bg-white border-b border-gray-800 py-4">
      <div class="mx-auto flex flex-col sm:flex-row justify-between items-center w-full">
      <img src="../assets/logga.svg" alt="Logga" class="max-h-[90px] mb-4 sm:mb-0 sm:mr-4">
        <nav class="w-full sm:w-auto">
      <ul
      class="flex flex-col sm:flex-row sm:justify-end gap-4 items-center px-4">
        <li>
          <RouterLink to="/"
            class="inline-block bg-white text-gray-700 border border-4 border-gray-400 py-2 px-2 rounded-md min-w-[120px] text-center transition-all duration-300 ease-in-out hover:scale-105">
            PRODUKTER</RouterLink>
        </li>
        <li>
          <RouterLink to="/add-product"
          class="inline-block bg-white text-gray-700 border border-4 border-gray-400 py-2 px-2 rounded-md min-w-[120px] text-center transition-all duration-300 ease-in-out hover:scale-105">
            NY PRODUKT</RouterLink>
        </li>
        <li>
            <Logout class="inline-block bg-white text-gray-700 border border-4 border-gray-400 py-2 px-2 rounded-md min-w-[120px] text-center transition-all duration-300 ease-in-out hover:scale-105" />
        </li>
      </ul>
    </nav>
    </div>
    </header>
</template>

<script>
import Logout from './Logout.vue';

export default {
    name: "Header",
    components: {
        Logout
    }
};
</script>
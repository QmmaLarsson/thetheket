<template>
    <Header />
    <h1 class="text-5xl text-center text-green-800 my-4">Lägg till ny produkt</h1>
    <AddProduct />
</template>

<script>
import AddProduct from '../components/AddProduct.vue';
import Header from '../components/Header.vue';

export default {
    components: {
        AddProduct,
        Header
    }
}
</script>
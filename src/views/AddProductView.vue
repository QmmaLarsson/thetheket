<template>
    <Header />
    <h1>Lägg till ny produkt</h1>
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
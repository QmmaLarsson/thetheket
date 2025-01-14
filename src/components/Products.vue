<template>
    <!-- Props används för att ta emot information om produkten -->
    <p>{{ product.productName }}, {{ product.productType }}, {{ product.productDescription }}, {{ product.price }}, {{
        product.numberInStock }}</p>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>
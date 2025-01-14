<template>
    <!-- Props används för att ta emot information om produkten -->

    <div class="px-4">
        <table class="min-w-full border border-red-600 mb-8">
            <thead class="bg-red-600 text-white">
                <tr>
                    <!-- Använder props för att ta emot filmens namn -->
                    <th colspan="2">{{ product.productName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Typ</strong></td>
                    <!-- Använder props för att ta emot år -->
                    <td class="px-4 py-2">{{ product.productType }}</td>
                </tr>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Beskrivning</strong></td>
                    <!-- Använder props för att ta emot år -->
                    <td class="px-4 py-2">{{ product.productDescription }}</td>
                </tr>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Pris</strong></td>
                    <!-- Använder props för att ta emot år -->
                    <td class="px-4 py-2">{{ product.price }}</td>
                </tr>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Antal i lager</strong></td>
                    <!-- Använder props för att ta emot år -->
                    <td class="px-4 py-2">{{ product.numberInStock }}</td>
                </tr>
                <tr>
                    <td colspan="2" class="text-center"><button @click="$emit('deleteProduct', product._id)"
                            class="bg-red-600 text-white font-bold py-2 px-4 m-2 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105">Ta
                            bort</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        product: Object
    }
}
</script>
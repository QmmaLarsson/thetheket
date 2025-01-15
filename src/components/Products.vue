<template>
    <div class="px-4">
        <table class="min-w-full border border-red-600 mb-8">
            <thead class="bg-red-600 text-white">
                <tr>
                    <!-- Använder props för att ta emot produktens namn -->
                    <th colspan="2">{{ product.productName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Typ</strong></td>
                    <!-- Använder props för att ta emot typ -->
                    <td class="px-4 py-2">{{ product.productType }}</td>
                </tr>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Beskrivning</strong></td>
                    <!-- Använder props för att ta emot beskrivning -->
                    <td class="px-4 py-2">{{ product.productDescription }}</td>
                </tr>
                <tr class="border-b border-red-600">
                    <td class="px-4 py-2"><strong>Pris</strong></td>
                    <!-- Använder props för att ta emot pris -->
                    <td class="px-4 py-2">{{ product.price }}</td>
                </tr>

                <tr class="border-b border-red-600">

                    <td class="px-4 py-2"><strong>Antal i lager</strong></td>
                     <td>
                        <!-- När "-" klickas, anropas metoden decreaseStock -->
                        <button @click="decreaseStock">-</button>
                        <!-- Använder props för att ta emot lagersaldo -->
                        <span>{{ product.numberInStock }}</span>
                        <!-- När "+" klickas, anropas metoden increaseStock -->
                        <button @click="increaseStock">+</button></td>
                </tr>
                <tr>
                    <!-- Skickar produktens id till föräldern vid klick på "Ta bort" -->
                    <td><button @click="$emit('deleteProduct', product._id)"
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
    },
    methods: {
        //Uppdaterar en produkts lagersaldo
        async updateStock() {
            try {
                //Skickar en PUT-förfrågan för att uppdatera en produkt med angivet ID
                const resp = await fetch("https://projektfullstackramverk.onrender.com/products/" + this.product._id,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            numberInStock: this.product.numberInStock,
                        }),
                    });

                    if(!resp.ok) {
                        throw new Error("Produkten kunde inte uppdateras")
                    }

            } catch (error) {
                console.error("Fel vid uppdatering av produkt:", error)
            }
        },
        //Ökar antalet varor med ett för varje klick
        increaseStock() {
            this.product.numberInStock++;
            this.updateStock();
        },
        //Minskar antalet varor med ett för varje klick
        decreaseStock() {
            if(this.product.numberInStock > 0) {
                this.product.numberInStock--;
                this.updateStock();
            }
        }
    }
}
</script>
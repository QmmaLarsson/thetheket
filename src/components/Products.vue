<template>
    <div class="bg-white p-4 rounded-lg shadow-lg m-6">
        <table class="min-w-full min-h-full table-auto">
            <thead class="bg-green-800 text-white">
                <tr>
                    <!-- Använder props för att ta emot produktens namn -->
                    <th colspan="2" class="p-3">{{ product.productName }}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Typ</strong></td>
                    <!-- Använder props för att ta emot typ -->
                    <td class="px-4 py-2">{{ product.productType }}</td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Beskrivning</strong></td>
                    <!-- Använder props för att ta emot beskrivning -->
                    <td class="px-4 py-2">{{ product.productDescription }}</td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Pris</strong></td>
                    <!-- Använder props för att ta emot pris -->
                    <td class="px-4 py-2">{{ product.price }}:-</td>
                </tr>

                <tr>
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Antal i lager</strong></td>
                     <td class="px-4 py-2 flex items-center">
                        <!-- När "-" klickas, anropas metoden decreaseStock -->
                        <button @click="decreaseStock" class="bg-green-800 text-white py-1 px-3 h-[30px] rounded-l hover:bg-gray-400">-</button>
                        <!-- Använder props för att ta emot lagersaldo -->
                        <input type="text" v-model.number="product.numberInStock" @change="updateStock" class="w-[40px] h-[30px] text-center border-t border-b border-l-0 border-r-0 border-gray-400">
                        <!-- När "+" klickas, anropas metoden increaseStock -->
                        <button @click="increaseStock" class="bg-green-800 text-white py-1 px-3 h-[30px] rounded-r hover:bg-gray-400">+</button></td>
                </tr>
                <!-- Innehållet uppdateras om message finns -->
                <tr v-if="message">
                    <td colspan="2" class="px-4 text-green-800 font-bold py-2">
                        {{ message }}
                    </td>
                </tr>
                <tr class="border-t">
                    <!-- Skickar produktens id till föräldern vid klick på "Ta bort" -->
                    <td colspan="2" class="text-center"><button @click="$emit('deleteProduct', product._id)"
                            class="bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105">Ta
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
    data() {
        return {
            //Reaktivt meddelande som visas när produktens lagersaldo uppdateras
            message: ''
        };
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

                    //Uppdatera meddelandet när lagersaldot är uppdaterat
                    this.message = 'Produktens lagersaldo har uppdaterats!';

                    //Återställ meddelandet efter tre sekunder
                    setTimeout(() => {
                        this.message = '';
                    }, 3000);

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
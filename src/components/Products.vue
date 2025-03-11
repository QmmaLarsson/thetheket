<template>
    <div class="bg-white p-4 rounded-lg shadow-lg m-6">
        <table class="min-w-full min-h-full table-auto">
            <thead class="bg-green-800 text-white">
                <tr>
                    <th colspan="2" class="p-3">
                        <!-- Använder props för att ta emot produktens namn -->
                        <template v-if="!editing">
                            {{ product.productName }}
                        </template>
                        <!-- När redigeringsläge är aktivt visas ett inputfält för namn -->
                        <template v-else>
                            <input type="text" v-model="product.productName" class="w-full p-2 bg-green-800 text-center border-2 border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white">
                        </template>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Typ</strong></td>
                    <td class="px-4 py-2">
                        <!-- Använder props för att ta emot typ -->
                        <template v-if="!editing">
                            {{ product.productType }}
                        </template>
                        <template v-else>
                            <!-- När redigeringsläge är aktivt visas ett selectfält för typ -->
                            <select v-model="product.productType" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
                                <option value="Svart te">Svart te</option>
                                <option value="Rött te">Rött te</option>
                                <option value="Grönt te">Grönt te</option>
                                <option value="Vitt te">Vitt te</option>
                            </select>
                        </template>
                    </td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Beskrivning</strong></td>
                    <td class="px-4 py-2">
                        <!-- Använder props för att ta emot beskrivning -->
                        <template v-if="!editing">
                            {{ product.productDescription }}
                        </template>
                        <!-- När redigeringsläge är aktivt visas en textarea för beskrivning -->
                        <template v-else>
                            <textarea type="text" v-model="product.productDescription" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800"></textarea>
                        </template>
                    </td>
                </tr>
                <tr class="border-b">
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Pris</strong></td>
                    <td class="px-4 py-2">
                        <!-- Använder props för att ta emot pris -->
                        <template v-if="!editing">
                            {{ product.price }}:-
                        </template>
                        <!-- När redigeringsläge är aktivt visas ett inputfält för pris -->
                        <template v-else>
                            <input type="number" v-model="product.price" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
                        </template>
                    </td>
                </tr>

                <tr>
                    <td class="px-4 py-2 font-semibold w-1/2"><strong>Antal i lager</strong></td>
                     <td class="px-4 py-2">
                        <!-- Använder props för att ta emot antal varor i lager -->
                        <template v-if="!editing">
                            {{ product.numberInStock }}
                        </template>
                        <!-- När redigeringsläge är aktivt visas ett inputfält för antal -->
                        <template v-else>
                            <input type="number" v-model.number="product.numberInStock" class="w-full p-2 border-2 border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-800">
                        </template>
                     </td>
                </tr>
                <!-- Innehållet uppdateras om error finns -->
                <tr v-if="error">
                    <td colspan="2" class="px-4 text-red-600 font-bold py-2">
                        {{ error }}
                    </td>
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
                            bort</button>
                        
                    <!-- Redigera-knapp -->
                    <button v-if="!editing" @click="toggleEdit" 
                            class="bg-green-800 text-white font-bold py-2 px-4 mt-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105 ml-4">
                            Redigera</button>

                    <!-- Spara-knapp som syns när redigeringsläge är aktivt -->
                    <button v-if="editing" @click="saveChanges"
                    class="bg-green-800 text-white font-bold py-2 px-4 mt-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105 ml-4">
                    Spara</button>
                </td>
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
            message: '',
            //Kontrollerar om redigeringsläget är aktivt
            editing: false,
            error: null
        };
    },
    methods: {
        //Ändra redigeringsläge
        toggleEdit() {
            this.editing = !this.editing;
            this.error = null;
        },
        //Spara ändringar
        async saveChanges() {
                //Kontrollera om några fält är tomma
                if (!this.product.productName.trim() || !this.product.productType.trim() || !this.product.productDescription.trim()) {
                this.error = "Alla fält måste fyllas i";
                return;
            }

                //Kontrollera om pris och antal i lager är positiva siffror
                if (isNaN(this.product.price) || this.product.price <= 0) {
                this.error = "Pris måste vara större än noll";
                return;
            }

                if (isNaN(this.product.numberInStock) || this.product.numberInStock < 0 || this.product.numberInStock === "") {
                this.error = "Antal i lager måste vara större än eller lika med noll";
                return;
            }

            try {
                const resp = await fetch("https://projektfullstackramverk.onrender.com/products/" + this.product._id, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        productName: this.product.productName,
                        productType: this.product.productType,
                        productDescription: this.product.productDescription,
                        price: this.product.price,
                        numberInStock: this.product.numberInStock,
                    }),
                });

                if (!resp.ok) {
                    throw new Error("Ändringarna kunde inte sparas");
                }

                //Stänger redigeringsläge efter klick på "Spara"
                this.message = 'Ändringarna har sparats!';
                this.toggleEdit();

                //Återställ meddelandet efter tre sekunder
                setTimeout(() => {
                    this.message = '';
                }, 3000);

            } catch (error) {
                console.error("Fel vid sparande av ändringar:", error);
            }
        }
    }
    }
</script>
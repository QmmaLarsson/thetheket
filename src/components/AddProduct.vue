<template>
    <div class="flex justify-center mb-8">
        <form @submit.prevent="addProduct()" class="border border-red-600 m-4 w-full max-w-[800px]">
            <p class="p-4">
                <label for="productName">
                    Namn:
                </label>
                <input v-model="productName" id="productName" type="text" name="productName"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
            </p>
            <p class="p-4">
                <label for="productType">
                    Typ:
                </label>
                <!-- Two-way binding mellan selectfältet och reaktiv data (productType) -->
                <select v-model="productType" id="productType" name="productType"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="Svart te">Svart te</option>
                    <option value="Rött te">Rött te</option>
                    <option value="Grönt te">Grönt te</option>
                    <option value="Vitt te">Vitt te</option>
                </select>
            </p>
            <p class="p-4">
                <label for="productDescription">
                    Beskrivning:
                </label>
                <!-- Two-way binding mellan inputfältet och reaktiv data (description) -->
                <input v-model="productDescription" id="productDescription" type="text" name="productDescription"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
            </p>
            <p class="p-4">
                <label for="price">
                    Pris:
                </label>
                <!-- Two-way binding mellan inputfältet och reaktiv data (pris) -->
                <input v-model="price" id="price" type="text" name="price"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
            </p>
            <p class="p-4">
                <label for="numberInStock">
                    Antal i lager:
                </label>
                <!-- Two-way binding mellan inputfältet och reaktiv data (pris) -->
                <input v-model="numberInStock" id="numberInStock" type="text" name="numberInStock"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
            </p>
            <input type="submit" value="Lägg till ny produkt"
                class="bg-red-600 text-white font-bold py-2 px-4 m-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105">
            <input type="reset"
                class="bg-red-600 text-white font-bold py-2 px-4 rounded min-w-[110px] transition-all duration-300 ease-in-out hover:scale-105">
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
export default {
    //Skapa ett reaktivt dataobjekt
    data() {
        return {
            productName: "",
            productType: "",
            productDescription: "",
            price: "",
            numberInStock: "",
            error: null
        }
    },
    //Emits som skickar signaler till föräldern när en produkt har lagts till
    emits: ["productAdded"],
    methods: {
        //Metod för att lägga till en ny produkt till webbtjänsten
        async addProduct() {
            //Kontrollera om alla fält är ifyllda
            if (!this.productName || !this.productType || !this.productDescription || !this.price || !this.numberInStock) {
                this.error = "Alla fält måste fyllas i";
                return;
            }

            //Kontrollera om pris och antal i lager är positiva siffror
            if (isNaN(this.price) || this.price <= 0) {
                this.error = "Pris måste vara ett positivt tal";
                return;
            }

            if (isNaN(this.numberInStock) || this.numberInStock <= 0) {
                this.error = "Antal i lager måste vara ett positivt tal";
                return;
            }

            let productBody = {
                    productName: this.productName,
                    productType: this.productType,
                    productDescription: this.productDescription,
                    price: parseInt(this.price),
                    numberInStock: parseInt(this.numberInStock),
                }

            try {
                //Skickar en POST-förfrågan för att lägga till en ny produkt
                const resp = await fetch("https://projektfullstackramverk.onrender.com/products", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Accept": "application/json",
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(productBody),
                });

                const data = await resp.json();

                //Rensar dataobjekten efter att produkten lagts till
                this.productName = "";
                this.productType = "";
                this.productDescription = "";
                this.price = "";
                this.numberInStock = "";

                this.$emit("productAdded");
            } catch (error) {
                console.error("Fel när ny produkt skulle läggas till:", error); 
            }
        }
    }
}
</script>
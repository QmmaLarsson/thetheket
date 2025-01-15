<template>
      <Header />
    <h1>Tebutiken</h1>
    <div>
        <label for="productType">
                    Typ:
                </label>
                <!-- Two-way binding mellan selectfältet och reaktiv data (teaType) -->
                <select v-model="teaType" @change="filterProducts" id="productType" name="productType"
                    class="w-full p-2 border bg-red-100 border-red-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600">
                    <option value="Alla">Alla</option>
                    <option value="Svart te">Svart te</option>
                    <option value="Rött te">Rött te</option>
                    <option value="Grönt te">Grönt te</option>
                    <option value="Vitt te">Vitt te</option>
                </select>
    </div>
    <!-- Loopar igenom alla produkter och skriver ut dem en och en till Products-komponenten, varje produkt skickas som en prop till Produkt-komponenten -->
    <Products v-for="product in filteredProducts" :product="product" :key="product._id"
        @deleteProduct="deleteProduct(product._id)" />
</template>

<script>
import AddProduct from '../components/AddProduct.vue';
import Products from '../components/Products.vue';
import Header from '../components/Header.vue';

export default {
    //Skapa dataobjekt
    data() {
        return {
            //Array som lagrar alla produkter som hämtas
            products: [],
            filteredProducts: [],
            teaType: "Alla"
        }
    },
    components: {
        Products,
        AddProduct,
        Header
    },
    methods: {
        //Hämtar alla produkter från en extern webbtjänst
        async fetchProducts() {
            try {
                //Skickar en GET-förfrågan för att hämta produkter
                const res = await fetch("https://projektfullstackramverk.onrender.com/products", {
                    headers: {
                        "Accept": "application/json"
                    },
                    credentials: "include"
                })

                const data = await res.json()

                if (res.ok) {
                    //Fyll products-arrayen med hämtad data
                    this.products = data;
                    this.filteredProducts = data;
                }

            } catch (error) {
                console.error("Fel vid hämtning av produkter:", error)
            }
        },
        filterProducts() {
            if(this.teaType === "Alla") {
                this.filteredProducts = this.products;
            } else {
                this.filteredProducts = this.products.filter((product) => product.productType === this.teaType);
            }
        },
        //Tar bort en produkt utifrån ett angivet ID
        async deleteProduct(id) {
            //Visa ruta för att bekräfta borttagning
            const confirmed = window.confirm("Är du säker på att du vill ta bort produkten?");

            if(confirmed){
                try {
                    //Skickar en DELETE-förfrågan för att ta bort en produkt
                    const resp = await fetch("https://projektfullstackramverk.onrender.com/products/" + id, {
                    method: "DELETE",
                    credentials: "include"
                    });

                    //Hämta produkterna på nytt efter att en produkt har tagits bort
                    if(resp.ok) {
                    this.fetchProducts();
                    }
                } catch (error) {
                    console.error("Fel vid bortttagning av produkt:", error)
                }
            }
        }
    },
    mounted() {
        this.fetchProducts();
    }

}

</script>
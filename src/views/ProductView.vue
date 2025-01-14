<template>
    <h1>Tebutiken</h1>
    <!-- Loopar igenom alla produkter och skriver ut dem en och en till Products-komponenten, varje produkt skickas som en prop till Produkt-komponenten -->
    <Products v-for="product in products" :product="product" :key="product._id"
        @deleteProduct="deleteProduct(product._id)" />
</template>

<script>
import AddProduct from '../components/AddProduct.vue';
import Products from '../components/Products.vue';

export default {
    //Skapa dataobjekt
    data() {
        return {
            //Array som lagrar alla produkter som hämtas
            products: []
        }
    },
    components: {
        Products,
        AddProduct
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
                }
            } catch (error) {
                console.log(error)
            }
        },
        //Tar bort en produkt utifrån ett angivet ID
        async deleteProduct(id) {
            //Skickar en DELETE-förfrågan för att ta bort en produkt
            const resp = await fetch("https://projektfullstackramverk.onrender.com/products/" + id, {
                method: "DELETE",
                credentials: "include"
            });

            //Hämta produkterna på nytt efter att en produkt har tagits bort
            this.fetchProducts();
        }
    },
    mounted() {
        this.fetchProducts();
    }

}

</script>